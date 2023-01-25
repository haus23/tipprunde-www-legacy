import { League } from 'dtp-types';
import { logger } from '~/logger';
import { cachedQuery } from '~/utils/cached-query';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getLeagues = cachedQuery(
  async (): Promise<League[]> => {
    logger.info('Query leagues');

    const docsSnaphot = await db
      .collection('leagues')
      .withConverter(modelConverter<League>())
      .get();

    return docsSnaphot.docs.map((doc) => League.parse(doc.data()));
  },
  {
    name: 'masterdata',
    getKey: () => 'leagues',
  }
);
