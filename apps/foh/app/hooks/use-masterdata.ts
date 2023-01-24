import { useMatches } from '@remix-run/react';
import type { League, Player, Rules, Team } from 'dtp-types';
import type { RawMasterdata } from '~/queries/get-masterdata';

export function useMasterdata() {
  const [rootRoute, , viewRoute] = useMatches();
  const data: RawMasterdata = rootRoute.data;

  const { championships, leagues, players, rules, teams } = data;

  let championship = championships[0];

  if (rootRoute.params.championshipId) {
    const foundChampionship = championships.find((c) => c.id === rootRoute.params.championshipId);
    foundChampionship && (championship = foundChampionship);
  }

  return {
    championships,
    championship,
    view: (viewRoute.handle?.view as string) || '',
    leagues: leagues.reduce(
      (hash, entity) => ({ ...hash, [entity.id]: entity }),
      {} as Record<string, League>
    ),
    players: players.reduce(
      (hash, entity) => ({ ...hash, [entity.id]: entity }),
      {} as Record<string, Player>
    ),
    rules: rules.reduce(
      (hash, entity) => ({ ...hash, [entity.id]: entity }),
      {} as Record<string, Rules>
    ),
    teams: teams.reduce(
      (hash, entity) => ({ ...hash, [entity.id]: entity }),
      {} as Record<string, Team>
    ),
  };
}
