import type { LoaderArgs } from '@remix-run/node';
import { Outlet, useRouteLoaderData, type ShouldRevalidateFunction } from '@remix-run/react';

import type { Championship, Ranking } from 'dtp-types';
import { AppHeader } from '~/components/layout/app-header';

import { getChampionships } from '~/queries/get-championships';
import { getRanking } from '~/queries/get-ranking';

export type AppData = Ranking & {
  championships: Championship[];
  championship: Championship;
};

export function useAppData(): AppData {
  return useRouteLoaderData('routes/__standings.($championshipId)') as AppData;
}

export async function loader({ params }: LoaderArgs): Promise<AppData> {
  const { championships, currentChampionship } = await getChampionships();

  let championship: Championship | undefined;

  if (params.championshipId) {
    championship = championships.find((c) => c.id === params.championshipId);

    if (!championship) {
      throw new Response('Not Found', {
        status: 404,
      });
    }
  } else {
    championship = currentChampionship;
  }

  const ranking = await getRanking(championship.id);

  return { championship, championships, ...ranking };
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
