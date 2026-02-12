import { NextRequest, NextResponse } from 'next/server';
import { sheets } from '@googleapis/sheets';
import { GoogleAuth } from 'google-auth-library';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(200),
  email: z.string().email('A valid email is required.').max(254),
  phone: z.string().max(30).optional(),
  linkedin: z
    .string()
    .max(300)
    .refine((v) => !v || /^https?:\/\/(www\.)?linkedin\.com\//i.test(v), {
      message: 'Please provide a valid LinkedIn URL.',
    })
    .optional(),
  company: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  website: z.string().optional(), // honeypot
});

// In-memory rate limiter with pruning (note: resets on serverless cold start)
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
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

async function appendToSheet(row: string[]) {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error('Google Sheets environment variables are not configured.');
  }

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
    range: 'Sheet1!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
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
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message ?? 'Invalid input.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { name, email, phone, linkedin, company, message, website } = result.data;

  // Honeypot — bots fill this hidden field, humans don't
  if (website) {
    return NextResponse.json({ success: true }); // fake success
  }

  // Append to sheet
  const timestamp = new Date().toISOString();
  const row = [
    timestamp,
    name.trim(),
    email.trim(),
    phone?.trim() ?? '',
    linkedin?.trim() ?? '',
    company?.trim() ?? '',
    message?.trim() ?? '',
  ];

  try {
    await appendToSheet(row);
    recordRequest(ip);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Google Sheets append failed:', err);
    return NextResponse.json(
      { error: 'Failed to save your message. Please try again.' },
      { status: 500 }
    );
  }
}
