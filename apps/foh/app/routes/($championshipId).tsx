import { defer, type LoaderArgs } from '@remix-run/node';
import { Await, Outlet, useLoaderData, type ShouldRevalidateFunction } from '@remix-run/react';
import { Suspense } from 'react';

import { AppHeader } from '~/components/layout/app-header';
import { AppLoading } from '~/components/layout/app-loading';
import { getStandings } from '~/queries/get-standings';

export async function loader({ params }: LoaderArgs) {
  const championshipId = params.championshipId || 'current';
  const standings = getStandings(championshipId);
  return defer({ standings });
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) => {
  return currentParams.championshipId !== nextParams.championshipId;
};

export default function AppLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl mt-6 sm:px-6 lg:px-8 pb-10">
        <Suspense fallback={<AppLoading />}>
          <Await resolve={data.standings}>
            <Outlet />
          </Await>
        </Suspense>
      </main>
    </>
  );
}
