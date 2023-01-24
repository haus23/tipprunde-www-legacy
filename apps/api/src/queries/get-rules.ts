import { Rules } from 'dtp-types';
import { logger } from '~/logger';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getRules = async (): Promise<Rules[]> => {
  let rules = await useStorage().getItem('db:rules');

  if (!rules) {
    logger.info('Query rules');

    const docsSnaphot = await db.collection('rules').withConverter(modelConverter<Rules>()).get();

    rules = docsSnaphot.docs.map((doc) => Rules.parse(doc.data()));

    await useStorage().setItem('db:rules', rules);
  }

  return rules;
};
