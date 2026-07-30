import type { LiveSessionAdapter, LiveVote } from "./types";

export class OfflineLiveAdapter implements LiveSessionAdapter {
  readonly mode = "offline" as const;
  private votes = new Map<string, Set<string>>();

  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {
    this.votes.clear();
  }

  async buzz(): Promise<void> {}

  async vote(participantToken: string, optionId: string): Promise<void> {
    for (const voters of this.votes.values()) voters.delete(participantToken);
    const voters = this.votes.get(optionId) ?? new Set<string>();
    voters.add(participantToken);
    this.votes.set(optionId, voters);
  }

  async getVotes(): Promise<LiveVote[]> {
    return [...this.votes.entries()].map(([optionId, voters]) => ({
      optionId,
      count: voters.size,
    }));
  }
}

