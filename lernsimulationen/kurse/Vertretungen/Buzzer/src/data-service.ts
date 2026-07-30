import type { Participant, Response, SessionState } from './types';

export interface DataService {
  createSession(): SessionState; getState(): SessionState | null; saveState(state: SessionState): void;
  joinSession(name: string): Participant; submitBuzz(participantId: string, value: string): void;
}

const KEY = 'classroom-buzzer/session';
const colors = ['#5b43ef','#e7476d','#008d98','#e48800','#4c8d2b','#b63caa','#1976d2','#a54b00'];
export class LocalDataService implements DataService {
  private read() { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) as SessionState : null; }
  createSession(): SessionState {
    const state: SessionState = { id: crypto.randomUUID(), code: Math.random().toString(36).slice(2,8).toUpperCase(), active: false, mode: 'buzzer', groupMode: false, participants: [], responses: [], pollOptions: ['A','B','C','D'], animations: true, multipleWinners: false, createdAt: Date.now() };
    this.saveState(state); return state;
  }
  getState() { return this.read(); }
  saveState(state: SessionState) { localStorage.setItem(KEY, JSON.stringify(state)); window.dispatchEvent(new Event('buzzer-state')); }
  joinSession(name: string) { const state = this.read(); if (!state) throw new Error('Keine Sitzung vorhanden.'); const p={ id: crypto.randomUUID(), name, color: colors[state.participants.length % colors.length], joinedAt: Date.now() }; state.participants.push(p); this.saveState(state); return p; }
  submitBuzz(participantId: string, value: string) { const state=this.read(); if (!state || !state.active) return; if (!state.multipleWinners && state.responses.some(r=>r.participantId===participantId)) return; const response: Response={participantId,value,at:Date.now()}; state.responses.push(response); this.saveState(state); }
}

export const dataService = new LocalDataService();
