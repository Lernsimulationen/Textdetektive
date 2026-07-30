export type SubjectPerspective = 'REL' | 'SOWI' | 'NEUTRAL';

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface ChapterQuiz {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface MoralDilemmaOption {
  label: string;
  stance: string;
  consequence: string;
  xpBonus: number;
}

export interface MoralDilemma {
  prompt: string;
  options: MoralDilemmaOption[];
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  perspective: SubjectPerspective;
  category: string;
  xpReward: number;
  image?: string;
  storyDialogue: string[];
  dossierLore?: string;
  dilemmaChoice?: MoralDilemma;
  taskInstruction: string;
  initialCode?: string;
  reflectionPrompt: string;
  quiz: ChapterQuiz;
  teamsLink?: string;
  oneNoteLink?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

export interface RankReward {
  level: number;
  title: string;
  unlockedTitle: string;
  unlockedItem: string;
  icon: string;
}

export interface Avatar {
  id: string;
  name: string;
  role: string;
  image: string;
  style: string;
}

export interface PlayerProfile {
  name: string;
  avatarId: string;
  bio?: string;
  specialization?: 'REL' | 'SOWI' | 'NEUTRAL';
  badgeCode?: string;
  filterStyle?: 'cyber' | 'matrix' | 'gold' | 'monochrome' | 'tactical';
  level: number;
  xp: number;
  rank: string;
  completedChapterIds: number[];
  unlockedBadgeIds: string[];
  unlockedRewardIds: string[];
  dilemmaDecisions: Record<number, number>;
  notes: Record<number, string>;
  reflections: Record<number, string>;
  settings: {
    typewriterSpeed: number;
    soundEnabled: boolean;
  };
}

export interface SupabaseEventHook {
  event: 'buzzer' | 'vote' | 'quiz';
  payload: Record<string, unknown>;
}
