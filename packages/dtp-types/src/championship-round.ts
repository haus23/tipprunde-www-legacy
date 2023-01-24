import { z } from 'zod';

export const ChampionshipRound = z.object({
  id: z.string(),
  nr: z.number(),
  published: z.boolean(),
  completed: z.boolean(),
  tipsPublished: z.boolean(),
  isDoubleRound: z.boolean().optional(),
});

export type ChampionshipRound = z.infer<typeof ChampionshipRound>;
