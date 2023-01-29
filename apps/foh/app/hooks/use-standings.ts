import { useMemo } from 'react';
import { useAsyncValue } from '@remix-run/react';
import type { Standings } from '~/queries/get-standings';

export function useStandings() {
  const data = useAsyncValue() as Standings;
  return useMemo(
    () => ({
      matches: [...data.matches].sort((a, b) => a.nr - b.nr),
      players: [...data.players].sort((a, b) => a.rank - b.rank),
      rounds: [...data.rounds].sort((a, b) => a.nr - b.nr),
      tips: data.tips,
    }),
    [data]
  );
}
