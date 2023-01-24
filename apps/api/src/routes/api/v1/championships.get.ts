import type { Championship } from 'dtp-types';
import { getChampionships } from '~/queries/get-championships';

export default eventHandler(async () => {
  let championships = await useStorage().getItem('db:championships');
  if (!championships) {
    championships = await getChampionships();
    await useStorage().setItem('db:championships', championships);
  }
  return championships;
});
