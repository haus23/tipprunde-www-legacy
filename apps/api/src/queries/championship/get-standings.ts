import {
  ChampionshipMatch,
  ChampionshipPlayer,
  ChampionshipRound,
  ChampionshipTip,
} from 'dtp-types';
import { logger } from '~/logger';
import { db } from '~/server/db';
import { modelConverter } from '~/server/model-converter';
import { cachedQuery } from '~/utils/cached-query';

export const getStandings = cachedQuery(
  async (championshipId: string) => {
    logger.info(`Query championships ${championshipId}`);

    const matchesDocsSnapshot = await db
      .collection(`championships/${championshipId}/matches`)
      .withConverter(modelConverter<ChampionshipMatch>())
      .get();
    const matches = matchesDocsSnapshot.docs.map((d) => ChampionshipMatch.parse(d.data()));

    const playersDocsSnapshot = await db
      .collection(`championships/${championshipId}/players`)
      .withConverter(modelConverter<ChampionshipPlayer>())
      .get();
    const players = playersDocsSnapshot.docs.map((d) => ChampionshipPlayer.parse(d.data()));

    const roundsDocsSnapshot = await db
      .collection(`championships/${championshipId}/rounds`)
      .withConverter(modelConverter<ChampionshipRound>())
      .get();
    const rounds = roundsDocsSnapshot.docs.map((d) => ChampionshipRound.parse(d.data()));

    const tipsDocsSnapshot = await db
      .collection(`championships/${championshipId}/tips`)
      .withConverter(modelConverter<ChampionshipTip>())
      .get();
    const tips = tipsDocsSnapshot.docs.map((d) => ChampionshipTip.parse(d.data()));

    logger.info(`Query championships ${championshipId} finished`);

    return { matches, players, rounds, tips };
  },
  {
    name: 'standings',
    getKey: (championshipId: string) => championshipId,
  }
);
