import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sheets } from '@googleapis/sheets';
import { GoogleAuth } from 'google-auth-library';
import { getAIProvider, type AIMessage } from '@/lib/ai/provider';

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1).max(5000),
    })
  ),
  context: z.enum(['chat', 'solver']).optional(),
});

// In-memory rate limiter with pruning (note: resets on serverless cold start)
const rateMap = new Map<string, number[]>();
const isDev = process.env.NODE_ENV === 'development';
const RATE_LIMIT = isDev ? 100 : 15;
const RATE_WINDOW_MS = isDev ? 5 * 60 * 1000 : 60 * 60 * 1000; // 5min dev, 1hr prod
const MAX_ENTRIES = 1000;

function pruneRateMap() {
  if (rateMap.size <= MAX_ENTRIES) return;
  const now = Date.now();
  for (const [ip, timestamps] of rateMap) {
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length === 0) {
      rateMap.delete(ip);
    } else {
      rateMap.set(ip, recent);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  rateMap.set(ip, recent);
  return recent.length >= RATE_LIMIT;
}

function recordRequest(ip: string) {
  const timestamps = rateMap.get(ip) ?? [];
  timestamps.push(Date.now());
  rateMap.set(ip, timestamps);
  pruneRateMap();
}

async function logChatToSheet(
  question: string,
  answer: string,
  success: boolean,
  ip: string
) {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) return;

  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = sheets({ version: 'v4', auth });

    await client.spreadsheets.values.append({
      spreadsheetId,
      range: 'ChatLog!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            ip,
            question,
            answer.slice(0, 500),
            success ? 'ok' : 'fallback',
          ],
        ],
      },
    });
  } catch (err) {
    console.error('Chat log to sheet failed:', err);
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error: 'rate_limited',
        message: "You've used all your questions for the hour — check back soon! In the meantime, you can message Christian directly through the contact form below.",
      },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // Validate with Zod
  const result = chatSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? 'Invalid input.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { messages, context } = result.data;

  // Extract the latest user question for logging
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';

  // Prepend system message for solver context
  const processedMessages: AIMessage[] = [...messages];
  if (context === 'solver') {
    processedMessages.unshift({
      role: 'system',
      content:
        "You are a technical solutions advisor helping users understand Christian Bourlier's approach to solving complex business and technical challenges. Focus on architecture, system design, diagnosis, and strategic implementation. Provide clear, actionable insights grounded in Christian's experience with data engineering, AI integration, and enterprise sales.",
    });
  }

  // Get AI response
  try {
    const provider = getAIProvider();
    const message = await provider.chat(processedMessages);
    recordRequest(ip);

    // Log conversation (fire-and-forget)
    logChatToSheet(lastUserMessage, message, true, ip);

    return NextResponse.json({ message });
  } catch (err) {
    console.error('AI provider error:', err);

    const fallbackMessage = "I'm sorry, I'm having trouble answering that right now. Please try again in a moment, or reach out to Christian directly through the contact form below.";
    recordRequest(ip);

    logChatToSheet(lastUserMessage, fallbackMessage, false, ip);

    return NextResponse.json({ message: fallbackMessage });
  }
}
