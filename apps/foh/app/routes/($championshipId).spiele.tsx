import { ChampionshipTip } from '@haus23/dtp-types';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import * as Select from '@radix-ui/react-select';
import { Fragment, useEffect, useReducer, useState } from 'react';

import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';
import { cn } from '~/utils/cn';

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
  // No sort column or order is 0 -> no sorting
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
  const { championship, teams, players: allPlayers } = useMasterdata();
  const { rounds, matches, players, tips } = useStandings();

  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id);

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
    setSelectedMatchId(matches[0].id);
  }, [matches]);

  return (
    <div>
      <div className="flex items-center gap-x-2 sm:gap-x-4 mx-2 sm:mx-0">
        <h2 className="text-xl font-semibold">
          <span className="hidden sm:inline">{championship.name} - </span>Tipps für
        </h2>
        <Select.Root value={selectedMatchId} onValueChange={setSelectedMatchId}>
          <Select.Trigger
            className="translate-y-[1px] grow basis-1/3 sm:grow-0 inline-flex items-center rounded justify-between p-1 pl-2 text-sm font-semibold violet-cta-int border-2 violet-border-int shadow focus:outline-none focus:ring-4 focus:ring-radix-violet7"
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
                  <Fragment key={r.id}>
                    <Select.Group>
                      <Select.Label className="text-radix-mauve11 text-sm">
                        Runde {r.nr}
                      </Select.Label>
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

                    <Select.Separator className="" />
                  </Fragment>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex justify-center">
                <ChevronDownIcon className="h-5 w-5" />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <table className="text-sm mt-8 w-full">
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
          {sortTips(playerTips, sorting).map((t) => (
            <tr className={cn(t.info && 'violet-cta')} key={t.id}>
              <td className="w-full py-3 px-4 md:px-6">{t.name}</td>
              <td className="text-center px-4 md:px-6">{t.tip}</td>
              <td className="text-center px-4 md:px-6">{t.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
