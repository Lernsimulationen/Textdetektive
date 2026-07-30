import type { LiveSessionAdapter, LiveVote } from "./types";

export interface SupabaseLiveConfig {
  projectUrl: string;
  anonKey: string;
}

/**
 * Optionaler Online-Adapter. Er wird vom Offline-Kern weder importiert noch
 * instanziiert, solange eine Nutzerin oder ein Nutzer das Zusatzmodul nicht
 * bewusst aktiviert. Nur anonyme Sitzungstokens und Ereignisse werden gesendet.
 */
export class SupabaseLiveAdapter implements LiveSessionAdapter {
  readonly mode = "supabase" as const;
  private roomCode = "";

  constructor(private readonly config: SupabaseLiveConfig) {
    if (!config.projectUrl.startsWith("https://")) {
      throw new Error("Supabase benötigt eine HTTPS-Adresse.");
    }
  }

  async connect(roomCode: string): Promise<void> {
    this.roomCode = roomCode.trim().toUpperCase();
    if (!/^[A-Z0-9-]{4,24}$/.test(this.roomCode)) {
      throw new Error("Der Raumcode ist ungültig.");
    }
  }

  async disconnect(): Promise<void> {
    this.roomCode = "";
  }

  async buzz(participantToken: string): Promise<void> {
    await this.insertEvent("buzz", participantToken);
  }

  async vote(participantToken: string, optionId: string): Promise<void> {
    await this.insertEvent("vote", participantToken, optionId);
  }

  async getVotes(): Promise<LiveVote[]> {
    this.ensureConnected();
    const url = new URL("/rest/v1/live_vote_totals", this.config.projectUrl);
    url.searchParams.set("room_code", `eq.${this.roomCode}`);
    const response = await fetch(url, { headers: this.headers() });
    if (!response.ok) throw new Error("Die Abstimmung konnte nicht geladen werden.");
    return (await response.json()) as LiveVote[];
  }

  private async insertEvent(
    eventType: "buzz" | "vote",
    participantToken: string,
    optionId?: string,
  ): Promise<void> {
    this.ensureConnected();
    const response = await fetch(
      new URL("/rest/v1/live_events", this.config.projectUrl),
      {
        method: "POST",
        headers: { ...this.headers(), "Content-Type": "application/json" },
        body: JSON.stringify({
          room_code: this.roomCode,
          event_type: eventType,
          participant_token: participantToken,
          option_id: optionId ?? null,
        }),
      },
    );
    if (!response.ok) throw new Error("Das anonyme Ereignis wurde nicht übertragen.");
  }

  private headers(): Record<string, string> {
    return {
      apikey: this.config.anonKey,
      Authorization: `Bearer ${this.config.anonKey}`,
    };
  }

  private ensureConnected(): void {
    if (!this.roomCode) throw new Error("Das Live-Modul ist nicht verbunden.");
  }
}

