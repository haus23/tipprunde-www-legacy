import { ChampionshipTip } from '@haus23/dtp-types';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '~/components/elements/tooltip';
import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';
import { classes } from '~/utils/classes';

export default function Ranking() {
  const championship = useChampionship();
  const { players: masterPlayers, teams } = useMasterdata();
  const { players, matches, tips } = useStandings();

  const matchesSortedByDate = [...matches].sort((a, b) => a.date.localeCompare(b.date));
  const nextMatchNr =
    matchesSortedByDate.findIndex((m) => !m.result) + 1 || matchesSortedByDate.length + 1;
  const currentMatches = matchesSortedByDate.slice(
    Math.max(0, nextMatchNr - 3),
    Math.min(matchesSortedByDate.length, nextMatchNr + 1)
  );

  const currentTips = {} as Record<string, any>;
  currentMatches.forEach((m) => {
    currentTips[m.id] = {} as Record<string, ChampionshipTip>;
    players.forEach((p) => {
      const tip = tips.find((t) => t.matchId === m.id && t.playerId === p.id);
      currentTips[m.id][p.id] = tip;
    });
  });

  return (
    <>
      <header className="flex items-center gap-x-2 sm:gap-x-4 mx-2 sm:mx-0">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight pb-1">
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
            <th scope="col" className="text-center px-4 md:px-6 ">
              <span className="font-medium uppercase hidden sm:inline">Zusatzpunkte</span>
              <span className="font-medium uppercase sm:hidden">Zusatzpkt</span>
            </th>
            <th scope="col" className="text-center px-4 md:px-6 ">
              <span className="font-medium uppercase hidden sm:inline">Gesamtpunkte</span>
              <span className="font-medium uppercase sm:hidden">Gesamt</span>
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
                <td className="text-center px-4 md:px-6">{p.extraPoints}</td>
                <td className="text-center px-4 md:px-6">{p.totalPoints}</td>
                {!championship.completed && (
                  <td>
                    <Tooltip
                      icon={CalendarDaysIcon}
                      ariaLabel={`Aktuelle Tipps von ${masterPlayers[p.playerId].name}`}
                      className="flex items-center pr-2"
                    >
                      <div className="text-sm grid grid-cols-[1fr_repeat(2,_auto)] w-[240px] pb-2">
                        <div className="py-2 pl-2 border-b neutral-border">Spiel</div>
                        <div className="p-2 text-center border-b neutral-border">Tipp</div>
                        <div className="p-2 text-center border-b neutral-border">Pkt</div>
                        {currentMatches.map((m) => {
                          const tip = currentTips[m.id][p.id] as ChampionshipTip;
                          return (
                            <Fragment key={m.id}>
                              <div
                                className={classes(
                                  'py-1 pl-2',
                                  (tip?.joker || tip?.lonelyHit) && 'brand-bg'
                                )}
                              >
                                {teams[m.hometeamId].shortname}-{teams[m.awayteamId].shortname}
                              </div>
                              <div
                                className={classes(
                                  'py-1 text-center',
                                  (tip?.joker || tip?.lonelyHit) && 'brand-bg'
                                )}
                              >
                                {tip?.tip}
                              </div>
                              <div
                                className={classes(
                                  'py-1 text-center',
                                  (tip?.joker || tip?.lonelyHit) && 'brand-bg'
                                )}
                              >
                                {m.result && tip?.points}
                              </div>
                            </Fragment>
                          );
                        })}
                      </div>
                    </Tooltip>
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
