import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Accordion from '@radix-ui/react-accordion';
import Select from '~/components/elements/select';
import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';
import { classes } from '~/utils/classes';

export default function Players() {
  const { players: masterPlayers, teams } = useMasterdata();
  const championship = useChampionship();
  const { players, rounds, matches, tips } = useStandings();

  const [playerId, setPlayerId] = useState(players[0].id);
  const player = players.find((p) => p.id === playerId);

  // find current round
  const currentRoundId = championship.completed
    ? undefined
    : [...matches].reverse().find((m) => m.result)?.roundId;

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
          value={playerId}
          onValueChange={setPlayerId}
          displayValue={(item) => masterPlayers[item.playerId].name}
        />
      </header>
      <Accordion.Root type="single" collapsible className="mt-6" defaultValue={currentRoundId}>
        {rounds.map((r) => (
          <Accordion.Item key={r.id} value={r.id} className="mt-1 first:mt-0">
            <Accordion.Header>
              <Accordion.Trigger className="group block w-full brand-bg-int py-2 px-4">
                <div className="flex items-center justify-between">
                  <span className="block">{`Runde ${r.nr}`}</span>
                  <ChevronDownIcon className="h-6 w-6 transition-transform transform group-data-[state=open]:rotate-180" />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <table className="w-full text-sm">
                <thead className="text-xs bg-brand2">
                  <tr>
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
                <tbody className="divide-y divide-neutral6 font-semibold">
                  {matches
                    .filter((m) => m.roundId === r.id)
                    .map((m) => {
                      const tip = tips.find((t) => t.matchId === m.id && t.playerId === player?.id);
                      const info = tip?.joker || tip?.lonelyHit || false;
                      return (
                        <tr className={classes(info && 'brand-bg')} key={m.id}>
                          <td className="w-full py-3 px-2 sm:px-4 md:px-6">
                            <span className="hidden sm:inline">
                              {teams[m.hometeamId].name} - {teams[m.awayteamId].name}
                            </span>
                            <span className="sm:hidden">
                              {teams[m.hometeamId].shortname} - {teams[m.awayteamId].shortname}
                            </span>
                          </td>
                          <td className="text-center px-2 sm:px-4 md:px-6">{m.result}</td>
                          <td className="text-center px-2 sm:px-4 md:px-6">{tip?.tip}</td>
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
        ))}
      </Accordion.Root>
    </>
  );
}
