import { createClient, type RealtimeChannel } from '@supabase/supabase-js';
import type { DataService } from './data-service';
import type { Participant, Response, SessionState } from './types';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const colors = ['#5b43ef', '#e7476d', '#008d98', '#e48800', '#4c8d2b', '#b63caa', '#1976d2', '#a54b00'];

/** Realtime-Adapter. Er ersetzt LocalDataService, sobald die UI auf asynchrone Aufrufe umgestellt wird. */
export class SupabaseDataService implements DataService {
  private client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  private state: SessionState | null = null;
  private channel: RealtimeChannel | null = null;

  createSession(): SessionState { throw new Error('SupabaseDataService ist asynchron: createSessionAsync verwenden.'); }
  getState(): SessionState | null { return this.state; }
  saveState(state: SessionState): void { void this.saveStateAsync(state); }
  joinSession(_name: string): Participant { throw new Error('SupabaseDataService ist asynchron: joinSessionAsync verwenden.'); }
  submitBuzz(participantId: string, value: string): void { void this.submitBuzzAsync(participantId, value); }

  async createSessionAsync(): Promise<SessionState> {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    const { data, error } = await this.client.from('sessions').insert({ code }).select().single();
    if (error) throw error;
    this.state = this.mapSession(data, [], []); await this.watch(data.id); return this.state;
  }

  async loadByCode(code: string): Promise<SessionState | null> {
    const { data, error } = await this.client.from('sessions').select().eq('code', code.toUpperCase()).maybeSingle();
    if (error) throw error;
    if (!data) return null;
    await this.refresh(data.id); await this.watch(data.id); return this.state;
  }

  async joinSessionAsync(name: string): Promise<Participant> {
    if (!this.state) throw new Error('Keine Sitzung geladen.');
    const participant = { session_id: this.state.id, display_name: name, color: colors[this.state.participants.length % colors.length] };
    const { data, error } = await this.client.from('participants').insert(participant).select().single();
    if (error) throw error;
    return { id: data.id, name: data.display_name, color: data.color, joinedAt: Date.parse(data.created_at) };
  }

  async submitBuzzAsync(participantId: string, value: string): Promise<void> {
    if (!this.state?.active) return;
    const { error } = await this.client.from('responses').insert({ session_id: this.state.id, participant_id: participantId, value });
    if (error) throw error;
  }

  async clearResponsesAsync(): Promise<void> {
    if (!this.state) return;
    const { error } = await this.client.from('responses').delete().eq('session_id', this.state.id);
    if (error) throw error;
  }

  async removeParticipantAsync(id: string): Promise<void> {
    const { error } = await this.client.from('participants').delete().eq('id', id);
    if (error) throw error;
  }

  private async saveStateAsync(s: SessionState) {
    const { error } = await this.client.from('sessions').update({ active: s.active, mode: s.mode, group_mode: s.groupMode, settings: { animations: s.animations, multipleWinners: s.multipleWinners, pollOptions: s.pollOptions } }).eq('id', s.id);
    if (error) console.error(error);
  }
  private async refresh(id: string) {
    const [session, participants, responses] = await Promise.all([
      this.client.from('sessions').select().eq('id', id).single(),
      this.client.from('participants').select().eq('session_id', id).order('created_at'),
      this.client.from('responses').select().eq('session_id', id).order('created_at')
    ]);
    if (session.error || participants.error || responses.error) throw session.error ?? participants.error ?? responses.error;
    this.state = this.mapSession(session.data, participants.data, responses.data);
    window.dispatchEvent(new Event('buzzer-state'));
  }
  private async watch(id: string) {
    this.channel?.unsubscribe();
    this.channel = this.client.channel(`classroom-${id}`).on('postgres_changes', { event: '*', schema: 'public', table: 'sessions', filter: `id=eq.${id}` }, () => this.refresh(id)).on('postgres_changes', { event: '*', schema: 'public', table: 'participants', filter: `session_id=eq.${id}` }, () => this.refresh(id)).on('postgres_changes', { event: '*', schema: 'public', table: 'responses', filter: `session_id=eq.${id}` }, () => this.refresh(id)).subscribe();
  }
  private mapSession(s: any, ps: any[], rs: any[]): SessionState {
    const settings = s.settings ?? {};
    return { id: s.id, code: s.code, active: s.active, mode: s.mode, groupMode: s.group_mode, participants: ps.map(p => ({ id: p.id, name: p.display_name, color: p.color, joinedAt: Date.parse(p.created_at) })), responses: rs.map(r => ({ participantId: r.participant_id, value: r.value, at: Date.parse(r.created_at) })) as Response[], pollOptions: settings.pollOptions ?? ['A', 'B', 'C', 'D'], animations: settings.animations ?? true, multipleWinners: settings.multipleWinners ?? false, createdAt: Date.parse(s.created_at) };
  }
}
