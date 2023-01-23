import { Championship } from 'dtp-types';

export async function getChampionships() {
  const response = await fetch(`${process.env.API_URL}/championships`);
  const championships = ((await response.json()) as Championship[]).map((c) =>
    Championship.parse(c)
  );
  const currentChampionship = championships[0];
  return { championships, currentChampionship };
}
