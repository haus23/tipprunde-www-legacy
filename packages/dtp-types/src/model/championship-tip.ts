import { z } from 'zod';

export const ChampionshipTip = z.object({
  id: z.string(),
  playerId: z.string(),
  matchId: z.string(),
  tip: z.string(),
  joker: z.boolean(),
  points: z.number(),
  lonelyHit: z.boolean().optional(),
});

export type ChampionshipTip = z.infer<typeof ChampionshipTip>;
