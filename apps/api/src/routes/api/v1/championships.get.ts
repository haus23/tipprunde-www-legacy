import type { Championship } from 'dtp-types';
import { getChampionships } from '~/queries/get-championships';

export default defineEventHandler<Championship[]>(() => getChampionships());
