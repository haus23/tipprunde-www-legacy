import { useRouteLoaderData } from '@remix-run/react';
import type { loader } from '~/root';

export function useMasterdata() {
  const data = useRouteLoaderData('root') as Awaited<ReturnType<typeof loader>>;
  return data;
}
