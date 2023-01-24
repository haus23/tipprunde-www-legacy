import type { LoaderArgs } from '@remix-run/node';
import { Outlet, type ShouldRevalidateFunction } from '@remix-run/react';

import { AppHeader } from '~/components/layout/app-header';
import { getStandings } from '~/queries/get-standings';

export async function loader({ params }: LoaderArgs) {
  const championshipId = params.championshipId || 'current';
  return getStandings(championshipId);
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) => {
  return currentParams.championshipId !== nextParams.championshipId;
};

export default function AppLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}
