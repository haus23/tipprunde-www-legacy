import type { Championship, League, Player, Rules, Team } from 'dtp-types';

export type RawMasterdata = {
  championships: Championship[];
  leagues: League[];
  players: Player[];
  rules: Rules[];
  teams: Team[];
};

export async function getMasterdata(): Promise<RawMasterdata> {
  const response = await fetch(`${process.env.API_URL}/masterdata`);
  return await response.json();
}
