import { z } from 'zod';

export const ChampionshipMatch = z.object({
  id: z.string(),
  roundId: z.string(),
  nr: z.number(),
  date: z.string(),
  leagueId: z.string(),
  hometeamId: z.string(),
  awayteamId: z.string(),
  result: z.string(),
  points: z.number(),
});

export type ChampionshipMatch = z.infer<typeof ChampionshipMatch>;
