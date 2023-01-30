import { useParams } from '@remix-run/react';
import { useMasterdata } from './use-masterdata';

export function useChampionship() {
  const { championships } = useMasterdata();
  const params = useParams();

  if (!params.championshipId) {
    return championships[0];
  } else {
    const championship = championships.find((c) => c.id === params.championshipId);
    if (!championship) {
      throw new Response('Not Found', {
        status: 404,
      });
    }
    return championship;
  }
}
