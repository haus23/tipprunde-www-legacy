import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Tooltip from '~/components/elements/tooltip';
import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';

export default function Ranking() {
  const championship = useChampionship();
  const { players: masterPlayers } = useMasterdata();
  const { players } = useStandings();

  return (
    <>
      <header className="flex items-center gap-x-2 sm:gap-x-4 mx-2 sm:mx-0">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight py-1">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>{championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}</span>
        </h2>
      </header>
      <table className="w-full text-sm mt-4">
        <thead className="text-xs bg-brand2">
          <tr>
            <th scope="col" className=" text-right py-3 px-4 md:px-6 ">
              <span className="font-medium uppercase">Platz</span>
            </th>
            <th scope="col" className="w-full text-left px-4 md:px-6">
              <span className="font-medium uppercase">Name</span>
            </th>
            {championship.completed && (
              <th scope="col" className="text-center px-4 md:px-6 ">
                <span className="font-medium uppercase hidden sm:inline">Zusatzpunkte</span>
                <span className="font-medium uppercase sm:hidden">Zusatzpkt</span>
              </th>
            )}
            <th scope="col" className="text-center px-4 md:px-6 ">
              <span className="font-medium uppercase hidden sm:inline">
                {championship.completed ? 'Gesamtpunkte' : 'Punkte'}
              </span>
              <span className="font-medium uppercase sm:hidden">
                {championship.completed ? 'Gesamt' : 'Punkte'}
              </span>
            </th>
            {!championship.completed && (
              <th>
                <span className="sr-only">Aktuelle Spiele</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="neutral-app-text divide-y divide-neutral6 font-semibold">
          {players.map((p, ix, players) => {
            const currentRank =
              ix === 0 ? '1.' : p.rank !== players[ix - 1].rank ? `${p.rank}.` : '';
            return (
              <tr key={p.id}>
                <td className="text-right px-4 md:px-6">{currentRank}</td>
                <td className="w-full px-4 md:px-6">
                  <Link
                    to={`spieler/${p.playerId}`}
                    className="inline-block w-full py-2.5 hover:brand-app-text-contrast"
                  >
                    {masterPlayers[p.playerId].name}
                  </Link>
                </td>
                {championship.completed && (
                  <td className="text-center px-4 md:px-6">{p.extraPoints}</td>
                )}
                <td className="text-center px-4 md:px-6">{p.totalPoints}</td>
                {!championship.completed && (
                  <td className="text-center px-4 md:px-6">
                    <Tooltip icon={CalendarDaysIcon}>Aktuelle Spiele</Tooltip>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
