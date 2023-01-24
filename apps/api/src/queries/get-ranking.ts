import { Rank, Ranking } from 'dtp-types';
import { logger } from '~/logger';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';
import type { ChampionshipPlayer } from '../server/model/championship-player';
import { getPlayers } from './get-players';

export const getRanking = async (championshipId: string): Promise<Ranking> => {

  let ranking = await useStorage().getItem(`db:ranking:${championshipId}`);

  if (!ranking) {

    const players = await getPlayers();

    logger.info(`Query ranking ${championshipId}`);

    const championshipPlayersSnapshot = await db
      .collection(`championships/${championshipId}/players`)
      .withConverter(modelConverter<ChampionshipPlayer>())
      .get();

    const ranks = championshipPlayersSnapshot.docs
      .map((doc) => doc.data())
      .map((cp) => Rank.parse({ ...cp, name: players[cp.playerId].name }))
      .sort((a, b) => a.rank - b.rank);

    ranking = {
      ranks,
    } satisfies Ranking;
    useStorage().setItem(`db:ranking:${championshipId}`, ranking)
  }
  return ranking;
};
