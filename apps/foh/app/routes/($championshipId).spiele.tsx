import { useEffect, useReducer, useState } from 'react';
import { motion } from 'framer-motion';
import type { ChampionshipTip } from '@haus23/dtp-types';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import * as Select from '@radix-ui/react-select';
import * as Tooltip from '@radix-ui/react-tooltip';

import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';
import { cn } from '~/utils/cn';
import { formatDate } from '~/utils/format-date';

export const handle = { view: 'spiele' };

// Table row type
type TipRow = Partial<ChampionshipTip> & {
  name: string;
  info: boolean;
};

// Feature Sorting
type SortColumn = 'name' | 'tip' | 'points';
type SortOrder = number; // 0 -> absteigend, 1 -> unsortiert, 1 -> aufsteigend
type SortSpec = { column?: SortColumn; order: SortOrder };

function sortReducer(state: SortSpec, column: SortColumn): SortSpec {
  if (column !== state.column) {
    return { column, order: 2 };
  } else {
    return { column, order: (state.order + 1) % 3 };
  }
}
function sortTips(tips: TipRow[], { column, order }: SortSpec) {
  // No sort column or order is 1 -> no sorting
  if (!column || order === 1) return tips;

  const missingTips = tips.filter((t) => !t.tip);
  const sortableTips = tips.filter((t) => Boolean(t.tip));

  switch (column) {
    case 'name':
      return [...tips].sort((a, b) => a.name.localeCompare(b.name) * (order - 1));
    case 'points':
      return [
        ...sortableTips.sort((a, b) => ((b.points || 0) - (a.points || 0)) * (order - 1)),
        ...missingTips,
      ];
    case 'tip':
      return [
        ...sortableTips.sort((a, b) => {
          const aGoals = a.tip!.split(':').map(Number);
          const aDiff = aGoals[0] - aGoals[1];
          const bGoals = b.tip!.split(':').map(Number);
          const bDiff = bGoals[0] - bGoals[1];
          return (bDiff - aDiff || bGoals[0] - aGoals[0]) * (order - 1);
        }),
        ...missingTips,
      ];
  }
}

export default function Spiele() {
  const { championship, leagues, teams, players: allPlayers } = useMasterdata();
  const { rounds, matches, players, tips } = useStandings();

  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id);
  const selectedMatch = matches.find((m) => m.id === selectedMatchId);

  const playerTips: TipRow[] = players.map((p) => {
    const tip = tips.find((t) => t.matchId === selectedMatchId && t.playerId === p.id);
    return {
      ...tip,
      name: allPlayers[p.playerId].name,
      info: tip?.joker || tip?.lonelyHit || false,
    };
  });

  const [sorting, changeSorting] = useReducer(sortReducer, {
    column: undefined,
    order: 0,
  } as SortSpec);

  useEffect(() => {
    const matchId = championship.completed
      ? matches[0].id
      : [...matches].reverse().find((m) => m.result)?.id || matches[0].id;
    setSelectedMatchId(matchId);
  }, [championship, matches]);

  // Tooltips
  const [openTips, setOpenTips] = useState(Array<boolean>(players.length));
  function setTipOpen(ix: number, open: boolean) {
    setOpenTips((state) => {
      const newState = [...state];
      newState[ix] = open;
      return newState;
    });
  }

  return (
    <div>
      <div className="flex items-center gap-x-2 sm:gap-x-4 mx-2 sm:mx-0">
        <h2 className="text-xl font-semibold">
          <span className="hidden sm:inline">{championship.name} - </span>Tipps für
        </h2>
        <Select.Root value={selectedMatchId} onValueChange={setSelectedMatchId}>
          <Select.Trigger
            className="translate-y-[1px] grow sm:grow-0 basis-1/2 md:basis-1/3 inline-flex items-center rounded justify-between p-1 pl-2 text-sm font-semibold violet-cta-int border-2 violet-border-int shadow focus:outline-none focus:ring-4 focus:ring-radix-violet7"
            aria-label="Spiel"
          >
            <Select.Value placeholder="Spiel wählen..." />
            <Select.Icon className="text-radix-violet11">
              <ChevronDownIcon className="h-5 w-5" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              position="popper"
              align="end"
              sideOffset={8}
              collisionPadding={16}
              className="select-content p-2 overflow-hidden bg-radix-mauve2 rounded-md shadow-lg ring-1 ring-radix-mauve6 ring-opacity-5 focus:outline-none"
            >
              <Select.ScrollUpButton className="flex justify-center">
                <ChevronUpIcon className="h-5 w-5" />
              </Select.ScrollUpButton>
              <Select.Viewport className="p-1">
                {rounds.map((r) => (
                  <Select.Group key={r.id}>
                    <Select.Label className="text-radix-mauve11 text-sm">Runde {r.nr}</Select.Label>
                    {matches
                      .filter((m) => m.roundId === r.id)
                      .map((m) => (
                        <Select.Item
                          value={m.id}
                          key={m.id}
                          className="cursor-pointer relative flex items-center justify-between space-x-2 my-1 py-1 pl-2 pr-8 text-sm data-[state=checked]:text-radix-violet11 rounded focus:outline-none focus:ring-2 focus:ring-radix-mauve7"
                        >
                          <Select.ItemText>{`${teams[m.hometeamId].shortname} - ${
                            teams[m.awayteamId].shortname
                          }`}</Select.ItemText>
                          <Select.ItemIndicator className="absolute right-0">
                            <CheckIcon className="p-1 h-6 w-6" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                  </Select.Group>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex justify-center">
                <ChevronDownIcon className="h-5 w-5" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      {selectedMatch !== undefined && (
        <div className="mx-2 md:mx-auto max-w-2xl mt-6 text-sm">
          <div className="w-full flex justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Wann</p>
              <p className="text-radix-violet12 font-semibold">{formatDate(selectedMatch.date)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Wo</p>
              <p className="text-radix-violet12 font-semibold">
                {leagues[selectedMatch.leagueId].name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Ergebnis</p>
              <p className="text-radix-violet12 font-semibold">{selectedMatch.result}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Punkte</p>
              <p className="text-radix-violet12 font-semibold">
                {selectedMatch.result && selectedMatch.points}
              </p>
            </div>
          </div>
          {rounds.find((r) => r.id === selectedMatch.roundId)?.isDoubleRound ? (
            <div className="mt-4 flex text-radix-mauve11 justify-center gap-x-2">
              <InformationCircleIcon className="h-6 w-6" />
              Das Spiel läuft in einer Doppelrunde.
              <span className="hidden sm:block">Alle erzielten Punkte werden verdoppelt.</span>
            </div>
          ) : null}
        </div>
      )}
      <Tooltip.Provider delayDuration={300}>
        <table className="text-sm mt-6 w-full">
          <thead className="text-xs bg-radix-violet2">
            <tr>
              <th scope="col" className="w-full text-left py-3 px-4 md:px-6">
                <button onClick={() => changeSorting('name')} className="relative">
                  <span className="font-medium uppercase pr-4">Spieler</span>
                  {sorting.column !== 'name' || sorting.order === 1 ? (
                    <ChevronUpDownIcon className="absolute right-0 top-0 h-4 w-4" />
                  ) : sorting.order === 0 ? (
                    <ArrowDownIcon className="absolute right-0 top-0 h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="absolute right-0 top-0 h-4 w-4" />
                  )}
                </button>
              </th>
              <th scope="col" className="text-center px-4 md:px-6 ">
                <button onClick={() => changeSorting('tip')} className="relative">
                  <span className="font-medium uppercase pr-4">Tipp</span>
                  {sorting.column !== 'tip' || sorting.order === 1 ? (
                    <ChevronUpDownIcon className="absolute right-0 top-0 h-4 w-4" />
                  ) : sorting.order === 0 ? (
                    <ArrowDownIcon className="absolute right-0 top-0 h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="absolute right-0 top-0 h-4 w-4" />
                  )}
                </button>
              </th>
              <th scope="col" className="text-center px-4 md:px-6">
                <button onClick={() => changeSorting('points')} className="relative">
                  <span className="font-medium uppercase pr-4">Punkte</span>
                  {sorting.column !== 'points' || sorting.order === 1 ? (
                    <ChevronUpDownIcon className="absolute right-0 top-0 h-4 w-4" />
                  ) : sorting.order === 0 ? (
                    <ArrowDownIcon className="absolute right-0 top-0 h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="absolute right-0 top-0 h-4 w-4" />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-radix-mauve6 font-semibold">
            {sortTips(playerTips, sorting).map((t, ix) => (
              <tr className={cn(t.info && 'violet-cta')} key={t.name}>
                <td className="w-full py-3 px-4 md:px-6">{t.name}</td>
                <td className="text-center px-4 md:px-6">{t.tip}</td>
                <td className="text-center px-4 md:px-6">
                  <div className="relative">
                    <span className="pr-4">{selectedMatch?.result && t.points}</span>
                    {t.info && (
                      <Tooltip.Root
                        open={openTips[ix]}
                        onOpenChange={(open) => setTipOpen(ix, open)}
                      >
                        <Tooltip.Trigger onClick={() => setTipOpen(ix, true)} asChild>
                          <InformationCircleIcon className="absolute right-0 top-0 h-5 w-5" />
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            asChild
                            sideOffset={2}
                            align="end"
                            className="px-4 py-2 text-radix-violet12 bg-radix-mauve2 rounded-md shadow-lg ring-1 ring-radix-mauve6 ring-opacity-5 focus:outline-none"
                          >
                            <motion.div
                              transition={{ duration: 0.1 }}
                              initial={{ opacity: 0, y: 5, scaleX: 0.5 }}
                              animate={{ opacity: 1, y: 0, scaleX: 1 }}
                            >
                              <Tooltip.Arrow className="fill-radix-mauve2" />
                              {t.joker === true && <p>Joker</p>}
                              {t.lonelyHit === true && <p>Einziger richtiger Tipp</p>}
                            </motion.div>
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tooltip.Provider>
    </div>
  );
}
