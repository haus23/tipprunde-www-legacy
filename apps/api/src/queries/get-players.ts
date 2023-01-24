import { Player } from 'dtp-types';
import { logger } from '~/logger';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getPlayers = async (): Promise<Player[]> => {
  let players = await useStorage().getItem('db:players');

  if (!players) {
    logger.info('Query players');

    const docsSnaphot = await db
      .collection('players')
      .withConverter(modelConverter<Player>())
      .get();

    players = docsSnaphot.docs.map((doc) => Player.parse(doc.data()));

    await useStorage().setItem('db:players', players);
  }

  return players;
};
