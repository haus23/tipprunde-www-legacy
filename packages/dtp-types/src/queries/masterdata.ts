import { Championship } from '../model/championship';
import { League } from '../model/league';
import { Player } from '../model/player';
import { Rules } from '../model/rules';
import { Team } from '../model/team';

export type MasterData = {
  championships: Championship[];
  leagues: Record<string, Omit<League, 'id'>>;
  players: Record<string, Omit<Player, 'id'>>;
  rules: Record<string, Omit<Rules, 'id'>>;
  teams: Record<string, Omit<Team, 'id'>>;
};
