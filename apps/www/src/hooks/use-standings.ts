import { useRouteLoaderData } from 'react-router-dom';
import { Standings } from '@haus23/dtp-types';

export function useStandings() {
  return useRouteLoaderData('standings') as Standings;
}
