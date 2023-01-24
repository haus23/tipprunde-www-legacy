import { Championship } from 'dtp-types';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getChampionships = async (): Promise<Championship[]> => {
  console.log('Query championships');

  const docsSnapshot = await db
    .collection('championships')
    .where('published', '==', true)
    .orderBy('nr', 'desc')
    .withConverter(modelConverter<Championship>())
    .get();

  return docsSnapshot.docs.map((d) => Championship.parse(d.data()));
};
