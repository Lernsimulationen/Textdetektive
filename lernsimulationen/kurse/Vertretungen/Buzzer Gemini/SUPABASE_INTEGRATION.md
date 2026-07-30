# ⚡ Supabase Migration Guide

Classroom Buzzer wurde von Beginn an so konzipiert, dass die Umstellung von der lokalen Offline-Version (`LocalDataService.ts`) zu einer Cloud-Echtzeitdatenbank mit **Supabase** in wenigen Minuten erfolgt – **ohne eine einzige Zeile UI- oder Komponenten-Code ändern zu müssen!**

---

## 🏗️ Funktionsweise der Datenbankschicht

Alle Datenzugriffe sind streng über die Schnittstelle `IDataService` (`src/types/index.ts`) gekapselt.

```typescript
export interface IDataService {
  createSession(initialMode?: SessionMode): Promise<SessionState>;
  joinSession(code: string, name: string, isGroup: boolean): Promise<Participant>;
  submitBuzz(code: string, participantId: string): Promise<boolean>;
  submitVote(code: string, participantId: string, option: string): Promise<boolean>;
  getState(code: string): Promise<SessionState | null>;
  subscribeToState(code: string, callback: (state: SessionState) => void): () => void;
  // ...
}
```

---

## 📋 Schritt-für-Schritt Anleitung zur Supabase-Anbindung

### Schritt 1: Supabase-Client installieren
```bash
npm install @supabase/supabase-js
```

### Schritt 2: Supabase-Tabellen anlegen
Erstelle im Supabase-Dashboard folgende 3 Tabellen:

#### 1. `sessions`
- `code` (Text, Primary Key)
- `mode` (Text)
- `group_mode` (Text)
- `is_active` (Boolean)
- `is_locked` (Boolean)
- `round_number` (Integer)
- `settings` (JSONB)
- `countdown` (Integer, Nullable)
- `created_at` (Timestamp)

#### 2. `participants`
- `id` (Text, Primary Key)
- `session_code` (Text, Foreign Key -> `sessions.code`)
- `name` (Text)
- `color` (Text)
- `score` (Integer)
- `is_group` (Boolean)
- `joined_at` (BigInt)

#### 3. `events`
- `id` (UUID, Primary Key)
- `session_code` (Text)
- `participant_id` (Text)
- `event_type` (Text: `'buzz'` oder `'vote'`)
- `payload` (JSONB: `{ order, timestamp, option }`)

---

### Schritt 3: `SupabaseDataService.ts` erstellen

Erstelle die Datei `src/services/SupabaseDataService.ts`:

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IDataService, SessionState, Participant, SessionMode, SessionSettings } from '../types';

const SUPABASE_URL = 'https://dein-projekt.supabase.co';
const SUPABASE_ANON_KEY = 'dein-anon-key';

export class SupabaseDataService implements IDataService {
  private client: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async createSession(initialMode: SessionMode = 'buzzer'): Promise<SessionState> {
    // Implementierung mit supabase.from('sessions').insert(...)
    // ...
  }

  subscribeToState(code: string, callback: (state: SessionState) => void): () => void {
    // Echtzeit-Subscriptions mit Supabase Realtime Channels
    const channel = this.client
      .channel(`session:${code}`)
      .on('postgres_changes', { event: '*', schema: 'public', filter: `session_code=eq.${code}` }, async () => {
        const state = await this.getState(code);
        if (state) callback(state);
      })
      .subscribe();

    return () => {
      this.client.removeChannel(channel);
    };
  }

  // Sämtliche weiteren IDataService-Methoden implementieren...
}
```

---

### Schritt 4: DataService-Factory umstellen

In `src/services/DataService.ts` muss lediglich der Standard-Dienst ausgetauscht werden:

```typescript
import { SupabaseDataService } from './SupabaseDataService';

// Von LocalDataService umstellen auf SupabaseDataService:
let currentDataService: IDataService = new SupabaseDataService();
```

Fertig! Sämtliche Ansichten (`TeacherDashboard`, `StudentView`, `SmartboardDisplay`) nutzen fortan automatisch Supabase.
