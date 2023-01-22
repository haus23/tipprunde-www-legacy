import { ChampionshipId } from '../../../../src/model/championship';
import { getRanking } from '../../../../src/queries/get-ranking';

export default eventHandler(async (event) => {
  const championshipId = ChampionshipId.parse(event.context.params.championshipId);
  const ranks = await getRanking(championshipId);
  return {
    ranks,
  };
});
