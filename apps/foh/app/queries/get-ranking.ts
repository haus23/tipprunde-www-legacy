import { Rank, type Ranking } from 'dtp-types';

export async function getRanking(championshipId: string) {
  const response = await fetch(`${process.env.API_URL}/ranking/${championshipId}`);
  const rankingData = (await response.json()) as Ranking;

  const ranks = rankingData.ranks.map((r) => Rank.parse(r));
  return { ranks };
}
