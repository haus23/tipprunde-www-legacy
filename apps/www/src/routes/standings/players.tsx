import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Accordion from '@radix-ui/react-accordion';

import Select from '~/components/elements/select';
import Tooltip from '~/components/elements/tooltip';

import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';
import { classes } from '~/utils/classes';
import { formatDate } from '~/utils/format-date';
import { useEffect } from 'react';

export default function Players() {
  const params = useParams();
  const navigate = useNavigate();
  const { players: masterPlayers, teams } = useMasterdata();
  const championship = useChampionship();
  const { players, rounds, matches, tips } = useStandings();

  const player =
    (params.playerId && players.find((p) => p.playerId === params.playerId)) || players[0];

  // Unknown player?
  useEffect(() => {
    if (params.playerId && player.playerId !== params.playerId) {
      navigate(`${params.championshipId ? '/' + params.championshipId : ''}/spieler`);
    }
  }, [params, player]);

  function changePlayer(id: string) {
    const playerId = players.find((p) => p.id === id)?.playerId;
    navigate(`${params.championshipId ? '/' + params.championshipId : ''}/spieler/${playerId}`);
  }

  // find current round
  const currentRoundId = championship.completed
    ? undefined
    : [...matches].reverse().find((m) => m.result)?.roundId;

  const playedMatches = matches.filter((m) => m.result).length;

  return (
    <>
      <header className="flex items-center gap-x-2 sm:gap-x-4 mx-2 sm:mx-0">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>Tipps von</span>
          <span className="sr-only">{player && masterPlayers[player.playerId].name}</span>
        </h2>
        <Select
          options={players}
          value={player.id}
          onValueChange={changePlayer}
          displayValue={(item) => masterPlayers[item.playerId].name}
        />
      </header>
      <div className="mx-2 md:mx-auto max-w-3xl mt-6 text-sm">
        <div className="w-full flex justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Platz</p>
            <p className="text-center brand-app-text-contrast font-semibold">{`${player.rank}.`}</p>
          </div>
          <div className="space-y-1">
            <p className="px-4 text-xs font-medium uppercase">Spiele</p>
            <p className="text-center brand-app-text-contrast font-semibold">{`${playedMatches} (${matches.length})`}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Punkte</p>
            <p className="text-center brand-app-text-contrast font-semibold">{player.points}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Schnitt</p>
            <p className="text-center brand-app-text-contrast font-semibold">{`${(
              player.points / playedMatches
            ).toFixed(2)}`}</p>
          </div>
        </div>
      </div>
      <Accordion.Root type="single" collapsible className="mt-6" defaultValue={currentRoundId}>
        {rounds.map((r) => {
          const matchesInRound = matches.filter((m) => m.roundId === r.id);
          const matchIds = matchesInRound.map((m) => m.id);
          const playedMatchesInRound = matchesInRound.filter((m) => m.result).length;
          const tipsInRound = tips.filter(
            (t) => matchIds.includes(t.matchId) && t.playerId === player.id
          );
          const pointsPerRound = tipsInRound.reduce((sum, t) => (sum += Number(t.points)), 0);
          return (
            <Accordion.Item key={r.id} value={r.id} className="mt-1 first:mt-0">
              <Accordion.Header>
                <Accordion.Trigger className="group block w-full brand-bg-int py-2 px-4">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="block">{`Runde ${r.nr}`}</span>
                    <div className="flex items-center gap-x-4">
                      <div className="text-sm flex gap-x-4">
                        <div className="flex gap-x-2">
                          <span className="hidden sm:block">Punkte:</span>
                          <span className="sm:hidden">&#x2211;</span>
                          {pointsPerRound}
                        </div>
                        <div className="flex gap-x-2">
                          <span className="hidden sm:block">Schnitt:</span>
                          <span className="sm:hidden">&#x2300;</span>
                          {(pointsPerRound / playedMatchesInRound).toFixed(2)}
                        </div>
                      </div>
                      <ChevronDownIcon className="h-6 w-6 transition-transform transform group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>
                <table className="w-full text-sm">
                  <thead className="text-xs bg-brand2">
                    <tr>
                      <th
                        scope="col"
                        className="hidden sm:table-cell text-center px-2 sm:px-4 md:px-6 "
                      >
                        <span className="font-medium uppercase">Datum</span>
                      </th>
                      <th scope="col" className="w-full text-left py-3 px-2 sm:px-4 md:px-6">
                        <span className="font-medium uppercase">Spiel</span>
                      </th>
                      <th scope="col" className="text-center px-2 sm:px-4 md:px-6 ">
                        <span className="font-medium uppercase">Ergebnis</span>
                      </th>
                      <th scope="col" className="text-center px-2 sm:px-4 md:px-6 ">
                        <span className="font-medium uppercase">Tipp</span>
                      </th>
                      <th scope="col" className="text-center px-2 sm:px-4 md:px-6">
                        <span className="font-medium uppercase">Punkte</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="neutral-app-text divide-y divide-neutral6 font-semibold">
                    {matchesInRound.map((m) => {
                      const tip = tips.find((t) => t.matchId === m.id && t.playerId === player?.id);
                      const info = tip?.joker || tip?.lonelyHit || false;
                      return (
                        <tr className={classes(info && 'brand-bg')} key={m.id}>
                          <td className="hidden sm:table-cell text-center px-2 sm:px-4 md:px-6">
                            {formatDate(m.date, { shortIfCurrent: true })}
                          </td>
                          <td className="w-full px-2 sm:px-4 md:px-6">
                            <Link
                              to={`../spiel/${m.nr}/${m.hometeamId}-${m.awayteamId}`}
                              className="inline-block w-full py-2.5 hover:brand-app-text-contrast"
                            >
                              <span className="hidden md:inline">
                                {teams[m.hometeamId].name} - {teams[m.awayteamId].name}
                              </span>
                              <span className="md:hidden">
                                {teams[m.hometeamId].shortname} - {teams[m.awayteamId].shortname}
                              </span>
                            </Link>
                          </td>
                          <td className="text-center px-2 sm:px-4 md:px-6">{m.result}</td>
                          <td className="text-center px-2 sm:px-4 md:px-6">
                            <div className="relative flex items-center">
                              <span>{tip?.tip}</span>
                              {info && (
                                <Tooltip className="absolute right-0 translate-x-6">
                                  {tip?.joker === true && <p>Joker</p>}
                                  {tip?.lonelyHit === true && <p>Einziger richtiger Tipp</p>}
                                </Tooltip>
                              )}
                            </div>
                          </td>
                          <td className="text-center px-2 sm:px-4 md:px-6">
                            {m.result && tip?.points}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </>
  );
}
