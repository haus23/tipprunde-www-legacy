import { MasterData } from '@haus23/dtp-types';
import { useRouteLoaderData } from 'react-router-dom';

export function useMasterdata() {
  const data = useRouteLoaderData('root') as MasterData;
  return data;
}
