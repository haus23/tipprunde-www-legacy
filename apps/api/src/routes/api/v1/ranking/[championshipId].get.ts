import { ChampionshipId, Ranking } from 'dtp-types';
import { getRanking } from '~/queries/get-ranking';

export default eventHandler(async (event) => {
  const championshipId = ChampionshipId.parse(event.context.params.championshipId);
  let ranking = await useStorage().getItem(`db:ranking:${championshipId}`);
  if (!ranking) {
    const ranks = await getRanking(championshipId);
    ranking = {
      ranks,
    } satisfies Ranking;
    useStorage().setItem(`db:ranking:${championshipId}`, ranking)
  }
  return ranking;
});
