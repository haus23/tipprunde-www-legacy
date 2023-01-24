import { Championship } from 'dtp-types';
import { logger } from '~/logger';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getChampionships = async (): Promise<Championship[]> => {
  let championships = await useStorage().getItem('db:championships');

  if (!championships) {
    logger.info('Query championships');

    const docsSnapshot = await db
      .collection('championships')
      .where('published', '==', true)
      .orderBy('nr', 'desc')
      .withConverter(modelConverter<Championship>())
      .get();

    championships = docsSnapshot.docs.map((d) => Championship.parse(d.data()));
    await useStorage().setItem('db:championships', championships);
  }

  return championships;
};
