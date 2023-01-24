import { useRouteLoaderData } from '@remix-run/react';
import type { Standings } from '~/queries/get-standings';

export function useStandings() {
  return useRouteLoaderData('routes/($championshipId)') as Standings;
}
