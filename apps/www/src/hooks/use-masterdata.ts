import { useRouteLoaderData } from 'react-router-dom';
import { MasterData } from '@haus23/dtp-types';

export function useMasterdata() {
  return useRouteLoaderData('root') as MasterData;
}
