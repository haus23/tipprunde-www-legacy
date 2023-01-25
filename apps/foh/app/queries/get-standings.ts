import type {
  ChampionshipMatch,
  ChampionshipPlayer,
  ChampionshipRound,
  ChampionshipTip,
} from '@haus23/dtp-types';

export type Standings = {
  matches: ChampionshipMatch[];
  players: ChampionshipPlayer[];
  rounds: ChampionshipRound[];
  tips: ChampionshipTip[];
};

export async function getStandings(championshipId: string): Promise<Standings> {
  const response = await fetch(`${process.env.API_URL}/standings/${championshipId}`);
  return await response.json();
}
