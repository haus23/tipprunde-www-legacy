import { createBrowserRouter } from 'react-router-dom';
import Matches from './routes/standings/matches';
import Players from './routes/standings/players';
import Ranking from './routes/standings/ranking';
import StandingsLayout from './routes/standings/_layout';
import RootLayout from './routes/_layout';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: ':championshipId?',
        element: <StandingsLayout />,
        children: [
          { index: true, element: <Ranking /> },
          { path: 'spieler', element: <Players /> },
          { path: 'spiele', element: <Matches /> },
        ],
      },
    ],
  },
]);
