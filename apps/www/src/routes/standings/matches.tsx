import { useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChampionshipTip } from '@haus23/dtp-types';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpDownIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Select from '~/components/elements/select';
import { useChampionship } from '~/hooks/use-championship';
import { useMasterdata } from '~/hooks/use-masterdata';
import { useStandings } from '~/hooks/use-standings';
import { formatDate } from '~/utils/format-date';
import { classes } from '~/utils/classes';
import Tooltip from '~/components/elements/tooltip';

// Table row type
type TipRow = Partial<ChampionshipTip> & {
  name: string;
  nameLink: string;
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

export default function Matches() {
  const { leagues, teams, players: masterPlayers } = useMasterdata();
  const championship = useChampionship();
  const { matches, players, rounds, tips } = useStandings();

  const params = useParams();
  const navigate = useNavigate();

  const match =
    (params.matchNr && matches.find((m) => String(m.nr) === params.matchNr)) ||
    (championship.completed
      ? matches[0]
      : [...matches].reverse().find((m) => m.result) || matches[0]);

  function changeMatch(id: string) {
    const match = matches.find((m) => m.id === id);
    navigate(
      `${params.championshipId ? '/' + params.championshipId : ''}/spiel/${match?.nr}/${
        match?.hometeamId
      }-${match?.awayteamId}`
    );
  }

  const playerTips: TipRow[] = players.map((p) => {
    const tip = tips.find((t) => t.matchId === match.id && t.playerId === p.id);
    return {
      ...tip,
      name: masterPlayers[p.playerId].name,
      nameLink: p.playerId,
      info: tip?.joker || tip?.lonelyHit || false,
    };
  });

  const [sorting, changeSorting] = useReducer(sortReducer, {
    column: undefined,
    order: 0,
  } as SortSpec);

  return (
    <>
      <header className="flex items-center gap-x-4 mx-2 sm:mx-0">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>Tipps für</span>
          <span className="sr-only">{`${match && teams[match.hometeamId].name} - ${
            match && teams[match.awayteamId].name
          }`}</span>
        </h2>
        <Select
          options={matches}
          value={match.id}
          onValueChange={changeMatch}
          displayValue={(item) =>
            `${teams[item.hometeamId].shortname} - ${teams[item.awayteamId].shortname}`
          }
          groups={rounds}
          groupKey="roundId"
          groupDisplayValue={(item) => `Runde ${item.nr}`}
        />
      </header>
      {match !== undefined && (
        <div className="mx-2 md:mx-auto max-w-3xl mt-6 text-sm">
          <div className="w-full flex justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Wann</p>
              <p className="text-brand12 font-semibold">{formatDate(match.date)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Wo</p>
              <p className="text-brand12 font-semibold">{leagues[match.leagueId].name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Ergebnis</p>
              <p className="text-brand12 font-semibold">{match.result}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase">Punkte</p>
              <p className="text-brand12 font-semibold">{match.result && match.points}</p>
            </div>
          </div>
          {rounds.find((r) => r.id === match.roundId)?.isDoubleRound ? (
            <div className="mt-4 flex text-neutral11 justify-center gap-x-2">
              <ExclamationTriangleIcon className="h-6 w-6" />
              Das Spiel läuft in einer Doppelrunde.
              <span className="hidden sm:block">Alle erzielten Punkte werden verdoppelt.</span>
            </div>
          ) : null}
        </div>
      )}
      <table className="text-sm mt-6 w-full">
        <thead className="text-xs bg-brand2">
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
        <tbody className="neutral-app-text divide-y divide-neutral6 font-semibold">
          {sortTips(playerTips, sorting).map((t, ix) => (
            <tr className={classes(t.info && 'brand-bg')} key={t.name}>
              <td className="w-full px-4 md:px-6 ">
                <Link
                  to={`../spieler/${t.nameLink}`}
                  className="inline-block py-2.5 w-full hover:brand-app-text-contrast"
                >
                  {t.name}
                </Link>
              </td>
              <td className="text-center px-4 md:px-6">
                <div className="relative flex items-center justify-center">
                  <span>{t.tip}</span>
                  {t.info && (
                    <Tooltip className="absolute right-0 translate-x-6">
                      {t.joker === true && <p>Joker</p>}
                      {t.lonelyHit === true && <p>Einziger richtiger Tipp</p>}
                    </Tooltip>
                  )}
                </div>
              </td>
              <td className="text-center px-4 md:px-6">
                <div className="relative">
                  <span className="pr-4">{match?.result && t.points}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
