import { z } from 'zod';
import { ChampionshipId } from 'dtp-types';
import { getStandings } from '~/queries/championship/get-standings';
import { getChampionships } from '~/queries/get-championships';

export default defineEventHandler(async (event) => {
  const championshipIdParseResult = ChampionshipId.or(z.literal('current')).safeParse(
    event.context.params.championshipId
  );

  if (!championshipIdParseResult.success) {
    return createError({
      statusCode: 406,
      statusText: 'Not accetable',
      statusMessage: 'Invalid championship',
      stack: undefined,
    });
  } else {
    let championshipId = championshipIdParseResult.data;

    if (championshipId === 'current') {
      const championships = await getChampionships();
      championshipId = championships[0].id;
    }

    return await getStandings(championshipId);
  }
});
