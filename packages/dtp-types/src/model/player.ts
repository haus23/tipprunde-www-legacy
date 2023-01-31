import { z } from 'zod';

export const Player = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export type Player = z.infer<typeof Player>;
