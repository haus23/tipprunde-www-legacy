import { logger } from '~/logger';
import type { Player } from '~/server/model/player';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getPlayers = async (): Promise<Record<string, Player>> => {
  let players = await useStorage().getItem('db:players');

  if (!players) {
    logger.info('Query players');

    const docsSnaphot = await db
      .collection('players')
      .withConverter(modelConverter<Player>())
      .get();

    players = docsSnaphot.docs
      .map((doc) => doc.data())
      .reduce((hash, entity) => ({ ...hash, [entity.id]: entity }), {} as Record<string, Player>);

    await useStorage().setItem('db:players', players);
  }

  return players;
};
