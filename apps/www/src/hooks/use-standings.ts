import { useRouteLoaderData } from 'react-router-dom';
import { LoaderReturnType } from '~/routes/standings/_layout';

export function useStandings() {
  const data = useRouteLoaderData('standings') as LoaderReturnType;
  return data;
}
