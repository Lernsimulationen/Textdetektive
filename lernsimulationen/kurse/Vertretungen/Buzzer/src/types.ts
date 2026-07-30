export type Mode = 'buzzer' | 'truefalse' | 'poll' | 'speed';
export type Participant = { id: string; name: string; color: string; joinedAt: number };
export type Response = { participantId: string; value: string; at: number };
export type SessionState = {
  id: string; code: string; active: boolean; mode: Mode; groupMode: boolean; participants: Participant[];
  responses: Response[]; pollOptions: string[]; animations: boolean; multipleWinners: boolean; createdAt: number;
};
