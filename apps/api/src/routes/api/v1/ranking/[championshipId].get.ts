import { ChampionshipId, Ranking } from 'dtp-types';
import { getRanking } from '~/queries/get-ranking';

export default defineEventHandler<Ranking>(async (event) => {
  const championshipId = ChampionshipId.parse(event.context.params.championshipId);
  return await getRanking(championshipId);
});
