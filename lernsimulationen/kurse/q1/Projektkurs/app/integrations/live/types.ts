export interface LiveVote {
  optionId: string;
  count: number;
}

export interface LiveSessionAdapter {
  readonly mode: "offline" | "supabase";
  connect(roomCode: string): Promise<void>;
  disconnect(): Promise<void>;
  buzz(participantToken: string): Promise<void>;
  vote(participantToken: string, optionId: string): Promise<void>;
  getVotes(): Promise<LiveVote[]>;
}

