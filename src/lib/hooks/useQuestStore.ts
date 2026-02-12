import { create } from 'zustand';

export type QuestPhase =
  | 'hero'
  | 'journey'
  | 'competencies'
  | 'opento'
  | 'workshop'
  | 'bossfight'
  | 'implementation'
  | 'download'
  | 'complete';

interface RevealedStreams {
  data: boolean;
  sales: boolean;
  poker: boolean;
}

interface QuestState {
  phase: QuestPhase;
  scrollProgress: number;
  revealedStreams: RevealedStreams;
  equationRevealed: boolean;
  questStarted: boolean;
  sectionsVisited: Set<string>;
  oneSheeterDownloaded: boolean;
  setPhase: (phase: QuestPhase) => void;
  setScrollProgress: (progress: number) => void;
  revealStream: (stream: keyof RevealedStreams) => void;
  toggleStream: (stream: keyof RevealedStreams) => void;
  revealEquation: () => void;
  startQuest: () => void;
  visitSection: (section: string) => void;
  markDownloaded: () => void;
}

export const useQuestStore = create<QuestState>((set) => ({
  phase: 'hero',
  scrollProgress: 0,
  revealedStreams: { data: false, sales: false, poker: false },
  equationRevealed: false,
  questStarted: false,
  sectionsVisited: new Set<string>(),
  oneSheeterDownloaded: false,

  setPhase: (phase) => set({ phase }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  revealStream: (stream) =>
    set((state) => ({
      revealedStreams: { ...state.revealedStreams, [stream]: true },
    })),
  toggleStream: (stream) =>
    set((state) => ({
      revealedStreams: { ...state.revealedStreams, [stream]: !state.revealedStreams[stream] },
    })),
  revealEquation: () => set({ equationRevealed: true }),
  startQuest: () => set({ questStarted: true }),
  visitSection: (section) =>
    set((state) => {
      const next = new Set(state.sectionsVisited);
      next.add(section);
      return { sectionsVisited: next };
    }),
  markDownloaded: () => set({ oneSheeterDownloaded: true }),
}));
