import { useRouteLoaderData } from '@remix-run/react';

export default function Tabelle() {
  const { ranking } = useRouteLoaderData('routes/__standings.($championshipId)') as {
    ranking: any;
  };

  return (
    <div>
      <h2>Tabelle</h2>
      {ranking.ranks.length}
    </div>
  );
}
