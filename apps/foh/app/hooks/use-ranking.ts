import { useRouteLoaderData } from '@remix-run/react';
import type { Standings } from '~/routes/__standings.($championshipId)';

export function useRanking(): Standings {
  return useRouteLoaderData('routes/__standings.($championshipId)') as Standings;
}
