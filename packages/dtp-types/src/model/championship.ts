import { z } from 'zod';

export const ChampionshipId = z.string().regex(/^[a-z]{2}\d{4}$/, 'Bad championship id');

export const Championship = z.object({
  id: ChampionshipId,
  name: z.string(),
  nr: z.number().positive(),
  rulesId: z.string(),
  published: z.boolean(),
  completed: z.boolean(),
  extraTipsPublished: z.boolean(),
});

export type Championship = z.infer<typeof Championship>;
