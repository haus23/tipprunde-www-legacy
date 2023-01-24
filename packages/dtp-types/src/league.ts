import { z } from 'zod';

export const League = z.object({
  id: z.string(),
  name: z.string(),
  shortname: z.string(),
});

export type League = z.infer<typeof League>;
