import {
  IDataService,
  SessionState,
  SessionMode,
  GroupMode,
  Participant,
  SessionSettings,
} from '../types';
import { GroupNameGenerator } from './GroupNameGenerator';

const STORAGE_PREFIX = 'cb_session_';
const CHANNEL_PREFIX = 'cb_channel_';

export class LocalDataService implements IDataService {
  private activeCode: string | null = null;
  private channel: BroadcastChannel | null = null;
  private listeners: Array<(state: SessionState) => void> = [];

  private generateSessionCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private getSessionKey(code: string): string {
    return `${STORAGE_PREFIX}${code.toUpperCase()}`;
  }

  private saveState(state: SessionState): void {
    state.lastUpdate = Date.now();
    const key = this.getSessionKey(state.code);
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    this.broadcast(state);
  }

  private loadState(code: string): SessionState | null {
    const key = this.getSessionKey(code);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SessionState;
    } catch (e) {
      console.error('Failed to parse session state:', e);
      return null;
    }
  }

  private initChannel(code: string): void {
    const formattedCode = code.toUpperCase();
    if (this.activeCode === formattedCode && this.channel) {
      return;
    }

    if (this.channel) {
      this.channel.close();
    }

    this.activeCode = formattedCode;
    const channelName = `${CHANNEL_PREFIX}${formattedCode}`;

    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(channelName);
      this.channel.onmessage = (event: MessageEvent<SessionState>) => {
        if (event.data && event.data.code === formattedCode) {
          this.notifyListeners(event.data);
        }
      };
    }

    // Storage event fallback for browsers without BroadcastChannel support or cross-window sync
    window.onstorage = (e: StorageEvent) => {
      if (e.key === this.getSessionKey(formattedCode) && e.newValue) {
        try {
          const newState = JSON.parse(e.newValue) as SessionState;
          this.notifyListeners(newState);
        } catch (err) {
          console.error(err);
        }
      }
    };
  }

  private broadcast(state: SessionState): void {
    if (this.channel) {
      try {
        this.channel.postMessage(state);
      } catch (e) {
        console.warn('BroadcastChannel postMessage failed', e);
      }
    }
    this.notifyListeners(state);
  }

  private notifyListeners(state: SessionState): void {
    this.listeners.forEach((cb) => cb(state));
  }

  async createSession(initialMode: SessionMode = 'buzzer'): Promise<SessionState> {
    const code = this.generateSessionCode();
    const defaultSettings: SessionSettings = {
      soundEnabled: true,
      soundType: 'buzzer',
      animationEnabled: true,
      confettiEnabled: true,
      vibrationEnabled: true,
      autoLock: true,
      visiblePlaces: 5,
      countdownSeconds: 3,
      pollOptions: ['A', 'B', 'C', 'D'],
      pollTitle: 'Umfrage',
      darkMode: false,
    };

    const state: SessionState = {
      code,
      mode: initialMode,
      groupMode: 'individual',
      isActive: true,
      isLocked: false,
      roundNumber: 1,
      participants: {},
      buzzes: [],
      votes: {},
      settings: defaultSettings,
      countdown: null,
      lastUpdate: Date.now(),
    };

    this.initChannel(code);
    this.saveState(state);
    return state;
  }

  async joinSession(code: string, name: string, isGroup: boolean): Promise<Participant> {
    const formattedCode = code.toUpperCase();
    const state = this.loadState(formattedCode);
    if (!state) {
      throw new Error(`Sitzung mit Code "${formattedCode}" wurde nicht gefunden.`);
    }

    this.initChannel(formattedCode);

    // Sanitize name (max 3 chars for individual, clean for group)
    const cleanName = isGroup ? name.trim() : name.trim().toUpperCase().slice(0, 3);
    if (!cleanName) {
      throw new Error('Bitte gib einen gültigen Namen oder eine Gruppe an.');
    }

    const participantCount = Object.keys(state.participants).length;
    const color = GroupNameGenerator.assignColor(participantCount);

    // Check if participant exists with exact same name to reconnect
    const existing = Object.values(state.participants).find(
      (p) => p.name.toUpperCase() === cleanName.toUpperCase()
    );

    if (existing) {
      return existing;
    }

    const newParticipant: Participant = {
      id: 'p_' + Math.random().toString(36).substring(2, 9),
      name: cleanName,
      color,
      score: 0,
      joinedAt: Date.now(),
      isGroup,
    };

    state.participants[newParticipant.id] = newParticipant;
    this.saveState(state);
    return newParticipant;
  }

  async submitBuzz(code: string, participantId: string): Promise<boolean> {
    const state = this.loadState(code);
    if (!state || !state.isActive || state.isLocked) return false;

    // Check if already buzzed this round
    const alreadyBuzzed = state.buzzes.some((b) => b.participantId === participantId);
    if (alreadyBuzzed) return false;

    const order = state.buzzes.length + 1;
    state.buzzes.push({
      participantId,
      timestamp: Date.now(),
      order,
    });

    if (state.settings.autoLock && state.mode === 'buzzer') {
      state.isLocked = true;
    }

    this.saveState(state);
    return true;
  }

  async submitVote(code: string, participantId: string, option: string): Promise<boolean> {
    const state = this.loadState(code);
    if (!state || !state.isActive || state.isLocked) return false;

    state.votes[participantId] = {
      participantId,
      option,
      timestamp: Date.now(),
    };

    this.saveState(state);
    return true;
  }

  async getState(code: string): Promise<SessionState | null> {
    const formattedCode = code.toUpperCase();
    this.initChannel(formattedCode);
    return this.loadState(formattedCode);
  }

  subscribeToState(code: string, callback: (state: SessionState) => void): () => void {
    const formattedCode = code.toUpperCase();
    this.initChannel(formattedCode);
    this.listeners.push(callback);

    // Initial emit
    const currentState = this.loadState(formattedCode);
    if (currentState) {
      callback(currentState);
    }

    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  async updateSettings(code: string, settings: Partial<SessionSettings>): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;
    state.settings = { ...state.settings, ...settings };
    this.saveState(state);
  }

  async setMode(code: string, mode: SessionMode): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;
    state.mode = mode;
    state.buzzes = [];
    state.votes = {};
    state.isLocked = false;
    this.saveState(state);
  }

  async setGroupMode(code: string, groupMode: GroupMode): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;
    state.groupMode = groupMode;
    this.saveState(state);
  }

  async setParticipantColor(code: string, participantId: string, color: string): Promise<void> {
    const state = this.loadState(code);
    if (!state || !state.participants[participantId]) return;
    state.participants[participantId].color = color;
    this.saveState(state);
  }

  async removeParticipant(code: string, participantId: string): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;
    delete state.participants[participantId];
    state.buzzes = state.buzzes.filter((b) => b.participantId !== participantId);
    delete state.votes[participantId];
    this.saveState(state);
  }

  async updateScore(code: string, participantId: string, delta: number): Promise<void> {
    const state = this.loadState(code);
    if (!state || !state.participants[participantId]) return;
    state.participants[participantId].score += delta;
    this.saveState(state);
  }

  async startCountdown(code: string, seconds: number = 3): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;

    state.isLocked = true;
    state.countdown = seconds;
    this.saveState(state);

    let current = seconds;
    const timer = setInterval(() => {
      current -= 1;
      const s = this.loadState(code);
      if (!s) {
        clearInterval(timer);
        return;
      }

      if (current <= 0) {
        clearInterval(timer);
        s.countdown = null;
        s.isLocked = false;
      } else {
        s.countdown = current;
      }
      this.saveState(s);
    }, 1000);
  }

  async toggleLock(code: string, locked?: boolean): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;
    state.isLocked = locked !== undefined ? locked : !state.isLocked;
    this.saveState(state);
  }

  async resetRound(code: string): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;
    state.buzzes = [];
    state.votes = {};
    state.isLocked = false;
    state.roundNumber += 1;
    state.countdown = null;
    this.saveState(state);
  }

  async clearResults(code: string): Promise<void> {
    const state = this.loadState(code);
    if (!state) return;
    state.buzzes = [];
    state.votes = {};
    state.isLocked = false;
    this.saveState(state);
  }
}

// DataService Factory (Easy replacement for Supabase)
let currentDataService: IDataService = new LocalDataService();

export function getDataService(): IDataService {
  return currentDataService;
}

export function setDataService(service: IDataService): void {
  currentDataService = service;
}
