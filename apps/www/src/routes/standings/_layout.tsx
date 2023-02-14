import { Standings } from '@haus23/dtp-types';
import { LoaderFunctionArgs, Outlet, ShouldRevalidateFunction } from 'react-router-dom';

export type LoaderReturnType = Standings;

export async function loader({ params }: LoaderFunctionArgs) {
  const championshipId = params.championshipId || 'current';

  const res = await fetch(`${import.meta.env.VITE_API_SERVER}/api/v1/standings/${championshipId}`);

  if (res.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }

  return res.json();
}

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) =>
  currentParams.championshipId !== nextParams.championshipId;

export default function StandingsLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
