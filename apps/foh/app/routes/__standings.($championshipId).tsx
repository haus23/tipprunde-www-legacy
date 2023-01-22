import { json, type LoaderArgs } from '@remix-run/node';
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  type ShouldRevalidateFunction,
} from '@remix-run/react';

export async function loader({ params }: LoaderArgs) {
  const championshipsResponse = await fetch(`${process.env.API_URL}/championships`);
  const championships = await championshipsResponse.json();

  const championshipId = params.championshipId ?? championships[0].id;

  const rankingResponse = await fetch(`${process.env.API_URL}/ranking/${championshipId}`);
  const ranking = await rankingResponse.json();

  return json({ championships, ranking });
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) => {
  return currentParams.championshipId !== nextParams.championshipId;
};

export default function StandingsLayout() {
  const { championships } = useLoaderData();
  return (
    <div style={{ fontFamily: 'system-ui', fontWeight: 500, lineHeight: '1.4' }}>
      <header>
        <h1>runde.tips</h1>
        <ul>
          {championships.map((c: any) => (
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
