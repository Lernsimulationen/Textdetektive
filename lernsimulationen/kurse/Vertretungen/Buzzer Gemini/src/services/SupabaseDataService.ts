import {
  IDataService,
  SessionState,
  SessionMode,
  GroupMode,
  Participant,
  SessionSettings,
} from '../types';
import { LocalDataService } from './DataService';

export const SUPABASE_CONFIG = {
  url: 'https://vshsluoxhusnyzpszsbm.supabase.co',
  anonKey: 'sb_publishable_i8fEatnRvmPXXnrtoKN4FQ_QHYMe9z3',
};

export class SupabaseDataService implements IDataService {
  private fallbackService: LocalDataService = new LocalDataService();
  private supabaseClient: any = null;

  constructor() {
    this.initSupabase();
  }

  private initSupabase(): void {
    if (typeof window === 'undefined') return;

    if ((window as any).supabase) {
      this.setupClient();
      return;
    }

    // Non-blocking dynamic CDN load for Supabase SDK
    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.onload = () => this.setupClient();
      script.onerror = () => {
        console.warn('Supabase CDN script could not be loaded. Operating in Local Mode.');
      };
      document.head.appendChild(script);
    } catch (e) {
      console.warn('Non-blocking Supabase init error:', e);
    }
  }

  private setupClient(): void {
    try {
      if ((window as any).supabase) {
        this.supabaseClient = (window as any).supabase.createClient(
          SUPABASE_CONFIG.url,
          SUPABASE_CONFIG.anonKey
        );
        console.log('⚡ Supabase Realtime Client active for URL:', SUPABASE_CONFIG.url);
      }
    } catch (e) {
      console.warn('Supabase setup error:', e);
    }
  }

  async createSession(initialMode: SessionMode = 'buzzer'): Promise<SessionState> {
    const state = await this.fallbackService.createSession(initialMode);
    if (this.supabaseClient) {
      try {
        await this.supabaseClient.from('sessions').upsert({
          code: state.code,
          mode: state.mode,
          group_mode: state.groupMode,
          is_active: state.isActive,
          is_locked: state.isLocked,
          round_number: state.roundNumber,
          settings: state.settings,
          countdown: state.countdown,
        });
      } catch (e) {
        console.warn('Supabase session sync skipped:', e);
      }
    }
    return state;
  }

  async joinSession(code: string, name: string, isGroup: boolean): Promise<Participant> {
    const participant = await this.fallbackService.joinSession(code, name, isGroup);
    if (this.supabaseClient) {
      try {
        await this.supabaseClient.from('participants').upsert({
          id: participant.id,
          session_code: code.toUpperCase(),
          name: participant.name,
          color: participant.color,
          score: participant.score,
          is_group: participant.isGroup,
          joined_at: participant.joinedAt,
        });
      } catch (e) {
        console.warn('Supabase participant sync skipped:', e);
      }
    }
    return participant;
  }

  async submitBuzz(code: string, participantId: string): Promise<boolean> {
    const success = await this.fallbackService.submitBuzz(code, participantId);
    if (success && this.supabaseClient) {
      try {
        await this.supabaseClient.from('events').insert({
          session_code: code.toUpperCase(),
          participant_id: participantId,
          event_type: 'buzz',
          payload: { timestamp: Date.now() },
        });
      } catch (e) {
        console.warn('Supabase buzz sync skipped:', e);
      }
    }
    return success;
  }

  async submitVote(code: string, participantId: string, option: string): Promise<boolean> {
    const success = await this.fallbackService.submitVote(code, participantId, option);
    if (success && this.supabaseClient) {
      try {
        await this.supabaseClient.from('events').insert({
          session_code: code.toUpperCase(),
          participant_id: participantId,
          event_type: 'vote',
          payload: { option, timestamp: Date.now() },
        });
      } catch (e) {
        console.warn('Supabase vote sync skipped:', e);
      }
    }
    return success;
  }

  async getState(code: string): Promise<SessionState | null> {
    return this.fallbackService.getState(code);
  }

  subscribeToState(code: string, callback: (state: SessionState) => void): () => void {
    const unsubscribeFallback = this.fallbackService.subscribeToState(code, callback);

    if (this.supabaseClient) {
      try {
        const channel = this.supabaseClient
          .channel(`session_${code.toUpperCase()}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', filter: `session_code=eq.${code.toUpperCase()}` },
            async () => {
              const state = await this.getState(code);
              if (state) callback(state);
            }
          )
          .subscribe();

        return () => {
          unsubscribeFallback();
          this.supabaseClient.removeChannel(channel);
        };
      } catch (e) {
        console.warn('Supabase channel subscription error:', e);
      }
    }

    return unsubscribeFallback;
  }

  async updateSettings(code: string, settings: Partial<SessionSettings>): Promise<void> {
    await this.fallbackService.updateSettings(code, settings);
  }

  async setMode(code: string, mode: SessionMode): Promise<void> {
    await this.fallbackService.setMode(code, mode);
  }

  async setGroupMode(code: string, groupMode: GroupMode): Promise<void> {
    await this.fallbackService.setGroupMode(code, groupMode);
  }

  async setParticipantColor(code: string, participantId: string, color: string): Promise<void> {
    await this.fallbackService.setParticipantColor(code, participantId, color);
  }

  async removeParticipant(code: string, participantId: string): Promise<void> {
    await this.fallbackService.removeParticipant(code, participantId);
  }

  async updateScore(code: string, participantId: string, delta: number): Promise<void> {
    await this.fallbackService.updateScore(code, participantId, delta);
  }

  async startCountdown(code: string, seconds?: number): Promise<void> {
    await this.fallbackService.startCountdown(code, seconds);
  }

  async toggleLock(code: string, locked?: boolean): Promise<void> {
    await this.fallbackService.toggleLock(code, locked);
  }

  async resetRound(code: string): Promise<void> {
    await this.fallbackService.resetRound(code);
  }

  async clearResults(code: string): Promise<void> {
    await this.fallbackService.clearResults(code);
  }
}
