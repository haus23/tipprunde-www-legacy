import { League } from 'dtp-types';
import { logger } from '~/logger';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getLeagues = async (): Promise<League[]> => {
  let leagues = await useStorage().getItem('db:leagues');

  if (!leagues) {
    logger.info('Query leagues');

    const docsSnaphot = await db
      .collection('leagues')
      .withConverter(modelConverter<League>())
      .get();

    leagues = docsSnaphot.docs.map((doc) => League.parse(doc.data()));

    await useStorage().setItem('db:leagues', leagues);
  }

  return leagues;
};
