import { Rank } from 'dtp-types';
import { db } from '../server/db';
import { modelConverter } from '../server/model-converter';
import type { ChampionshipPlayer } from '../server/model/championship-player';
import type { Player } from '../server/model/player';

export const getRanking = async (championshipId: string) => {
  console.log('Query ranking', championshipId);

  const playersSnaphot = await db
    .collection('players')
    .withConverter(modelConverter<Player>())
    .get();
  const playersHash = playersSnaphot.docs
    .map((doc) => doc.data())
    .reduce((hash, entity) => ({ ...hash, [entity.id]: entity }), {} as Record<string, Player>);

  const championshipPlayersSnapshot = await db
    .collection(`championships/${championshipId}/players`)
    .withConverter(modelConverter<ChampionshipPlayer>())
    .get();

  const ranks = championshipPlayersSnapshot.docs
    .map((doc) => doc.data())
    .map((cp) => Rank.parse({ ...cp, name: playersHash[cp.playerId].name }))
    .sort((a, b) => a.rank - b.rank);

  return ranks;
};
