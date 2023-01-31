import { ChampionshipMatch } from '../model/championship-match';
import { ChampionshipPlayer } from '../model/championship-player';
import { ChampionshipRound } from '../model/championship-round';
import { ChampionshipTip } from '../model/championship-tip';

export type Standings = {
  matches: ChampionshipMatch[];
  players: ChampionshipPlayer[];
  rounds: ChampionshipRound[];
  tips: ChampionshipTip[];
};
