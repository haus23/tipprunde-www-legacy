import { Championship } from 'dtp-types';
import { logger } from '~/logger';
import { cachedQuery } from '~/utils/cached-query';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getChampionships = cachedQuery(
  async (): Promise<Championship[]> => {
    logger.info('Query championships');

    const docsSnapshot = await db
      .collection('championships')
      .where('published', '==', true)
      .orderBy('nr', 'desc')
      .withConverter(modelConverter<Championship>())
      .get();

    return docsSnapshot.docs.map((d) => Championship.parse(d.data()));
  },
  {
    name: 'masterdata',
    getKey: () => 'championships',
  }
);
