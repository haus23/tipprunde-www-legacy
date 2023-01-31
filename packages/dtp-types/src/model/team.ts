import { z } from 'zod';

export const Team = z.object({
  id: z.string(),
  name: z.string(),
  shortname: z.string(),
});

export type Team = z.infer<typeof Team>;
