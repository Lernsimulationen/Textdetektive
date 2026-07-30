export type SessionMode = 'buzzer' | 'right_wrong' | 'poll' | 'speed';
export type GroupMode = 'individual' | 'group';
export type SoundType = 'none' | 'beep' | 'bell' | 'buzzer' | 'fanfare';

export interface Participant {
  id: string;
  name: string;
  color: string;
  score: number;
  joinedAt: number;
  isGroup: boolean;
}

export interface BuzzEvent {
  participantId: string;
  timestamp: number;
  order: number;
}

export interface VoteEvent {
  participantId: string;
  option: string;
  timestamp: number;
}

export interface SessionSettings {
  soundEnabled: boolean;
  soundType: SoundType;
  animationEnabled: boolean;
  confettiEnabled: boolean;
  vibrationEnabled: boolean;
  autoLock: boolean;
  visiblePlaces: number;
  countdownSeconds: number;
  pollOptions: string[];
  pollTitle: string;
  darkMode: boolean;
}

export interface SessionState {
  code: string;
  mode: SessionMode;
  groupMode: GroupMode;
  isActive: boolean;
  isLocked: boolean;
  roundNumber: number;
  participants: Record<string, Participant>;
  buzzes: BuzzEvent[];
  votes: Record<string, VoteEvent>; // participantId -> VoteEvent
  settings: SessionSettings;
  countdown: number | null;
  lastUpdate: number;
}

export interface IDataService {
  createSession(initialMode?: SessionMode): Promise<SessionState>;
  joinSession(code: string, name: string, isGroup: boolean): Promise<Participant>;
  submitBuzz(code: string, participantId: string): Promise<boolean>;
  submitVote(code: string, participantId: string, option: string): Promise<boolean>;
  getState(code: string): Promise<SessionState | null>;
  subscribeToState(code: string, callback: (state: SessionState) => void): () => void;
  updateSettings(code: string, settings: Partial<SessionSettings>): Promise<void>;
  setMode(code: string, mode: SessionMode): Promise<void>;
  setGroupMode(code: string, groupMode: GroupMode): Promise<void>;
  setParticipantColor(code: string, participantId: string, color: string): Promise<void>;
  removeParticipant(code: string, participantId: string): Promise<void>;
  updateScore(code: string, participantId: string, delta: number): Promise<void>;
  startCountdown(code: string, seconds?: number): Promise<void>;
  toggleLock(code: string, locked?: boolean): Promise<void>;
  resetRound(code: string): Promise<void>;
  clearResults(code: string): Promise<void>;
}
