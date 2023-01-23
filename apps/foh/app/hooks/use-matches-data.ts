import { useMatches } from '@remix-run/react';
import type { Championship } from 'dtp-types';

export function useMatchesData() {
  const matches = useMatches();

  const layoutRoute = matches[1];
  const viewRoute = matches[2];

  return {
    championship: layoutRoute.data.championship as Championship,
    championships: layoutRoute.data.championships as Championship[],
    view: (viewRoute.handle?.view as string) || '',
  };
}
