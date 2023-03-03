import { createBrowserRouter } from 'react-router-dom';
import Login from './routes/auth/login';
import Matches from './routes/standings/matches';
import Players from './routes/standings/players';
import Ranking from './routes/standings/ranking';
import StandingsLayout, {
  loader as standingsLoader,
  shouldRevalidate as shouldRevalidateStandings,
} from './routes/standings/_layout';
import ErrorBoundary from './routes/_error';
import RootLayout, {
  loader as rootLoader,
  shouldRevalidateFunction as shouldRevalidateRoot,
} from './routes/_layout';

export const appRouter = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: rootLoader,
    shouldRevalidate: shouldRevalidateRoot,
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        id: 'standings',
        path: ':championshipId?',
        loader: standingsLoader,
        shouldRevalidate: shouldRevalidateStandings,
        element: <StandingsLayout />,
        children: [
          { index: true, element: <Ranking />, handle: '' },
          { path: 'spieler/:playerId?', element: <Players />, handle: '/spieler' },
          { path: 'spiel/:matchNr?/:lineup?', element: <Matches />, handle: '/spiel' },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);
