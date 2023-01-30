import type { Championship, League, Player, Rules, Team } from '@haus23/dtp-types';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'runde.tips',
  viewport: 'width=device-width,initial-scale=1',
});

type MasterData = {
  championships: Championship[];
  leagues: Record<string, Omit<League, 'id'>>;
  players: Record<string, Omit<Player, 'id'>>;
  rules: Record<string, Omit<Rules, 'id'>>;
  teams: Record<string, Omit<Team, 'id'>>;
};

export async function loader({ params }: LoaderArgs) {
  const response = await fetch(`${process.env.API_URL}/masterdata`);
  const { championships, leagues, players, teams, rules } = (await response.json()) as MasterData;

  if (params.championshipId) {
    if (!championships.find((c) => c.id === params.championshipId)) {
      throw new Response('Not Found', {
        status: 404,
      });
    }
  }

  return {
    championships,
    leagues,
    players,
    teams,
    rules,
  };
}

export const shouldRevalidate = () => false;

export default function App() {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
        <script src="/theme.js"></script>
      </head>
      <body className="bg-radix-mauve1 text-radix-mauve12">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
