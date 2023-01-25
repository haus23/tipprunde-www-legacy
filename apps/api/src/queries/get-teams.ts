import { Team } from 'dtp-types';
import { logger } from '~/logger';
import { cachedQuery } from '~/utils/cached-query';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getTeams = cachedQuery(
  async (): Promise<Team[]> => {
    logger.info('Query teams');

    const docsSnaphot = await db.collection('teams').withConverter(modelConverter<Team>()).get();

    return docsSnaphot.docs.map((doc) => Team.parse(doc.data()));
  },
  {
    name: 'masterdata',
    getKey: () => 'teams',
  }
);
