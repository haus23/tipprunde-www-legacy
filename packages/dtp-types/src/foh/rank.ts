import { z } from 'zod';

export const Rank = z.object({
  playerId: z.string(),
  name: z.string(),
  nr: z.number(),
  points: z.number(),
  extraPoints: z.number(),
  totalPoints: z.number(),
  rank: z.number(),
});

export type Rank = z.infer<typeof Rank>;
