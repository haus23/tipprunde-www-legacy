import { z } from 'zod';

export const Player = z.object({
  id: z.string(),
  name: z.string(),
  shortname: z.string().email().optional(),
});

export type Player = z.infer<typeof Player>;
