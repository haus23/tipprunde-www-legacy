import { useMatches } from '@remix-run/react';

export function useView() {
  const matches = useMatches();

  const view = matches.find((m) => m.handle && m.handle.view);
  const viewName: string = view?.handle?.view || '';
  return viewName;
}
