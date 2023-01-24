import { Team } from 'dtp-types';
import { logger } from '~/logger';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';

export const getTeams = async (): Promise<Team[]> => {
  let teams = await useStorage().getItem('db:teams');

  if (!teams) {
    logger.info('Query teams');

    const docsSnaphot = await db.collection('teams').withConverter(modelConverter<Team>()).get();

    teams = docsSnaphot.docs.map((doc) => Team.parse(doc.data()));

    await useStorage().setItem('db:teams', teams);
  }

  return teams;
};
