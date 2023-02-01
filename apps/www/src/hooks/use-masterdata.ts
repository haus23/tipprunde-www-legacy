import { useRouteLoaderData } from 'react-router-dom';
import { LoaderReturnType } from '~/routes/_layout';

export function useMasterdata() {
  const data = useRouteLoaderData('root') as LoaderReturnType;
  return data;
}
