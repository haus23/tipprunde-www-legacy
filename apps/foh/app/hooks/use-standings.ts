import { useAsyncValue } from '@remix-run/react';
import type { Standings } from '~/routes/($championshipId)';

export function useStandings() {
  const data = useAsyncValue() as Standings;
  return data;
}
