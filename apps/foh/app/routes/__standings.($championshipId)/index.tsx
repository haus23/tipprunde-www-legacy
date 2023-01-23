import type { LoaderArgs } from '@remix-run/node';
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  type ShouldRevalidateFunction,
} from '@remix-run/react';

import type { Championship, Ranking } from 'dtp-types';
import { getChampionships } from '~/queries/get-championships';
import { getRanking } from '~/queries/get-ranking';

export type Standings = Ranking & {
  championships: Championship[];
  championship: Championship;
};

export async function loader({ params }: LoaderArgs): Promise<Standings> {
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

export default function StandingsLayout() {
  const { championships } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: 'system-ui', fontWeight: 500, lineHeight: '1.4' }}>
      <header>
        <h1 className="text-xl font-semibold">runde.tips</h1>
        <ul>
          {championships.map((c) => (
            <li key={c.id}>
              <Link to={`/${c.id}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <NavLink to="">Tabelle</NavLink>
          </li>
          <li>
            <NavLink to="spieler">Spieler</NavLink>
          </li>
          <li>
            <NavLink to="spiele">Spiele</NavLink>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
