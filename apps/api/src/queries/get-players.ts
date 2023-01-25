import { Player } from 'dtp-types';
import { logger } from '~/logger';
import { cachedQuery } from '~/utils/cached-query';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getPlayers = cachedQuery(
  async (): Promise<Player[]> => {
    logger.info('Query players');

    const docsSnaphot = await db
      .collection('players')
      .withConverter(modelConverter<Player>())
      .get();

    return docsSnaphot.docs.map((doc) => Player.parse(doc.data()));
  },
  {
    name: 'masterdata',
    getKey: () => 'players',
  }
);
