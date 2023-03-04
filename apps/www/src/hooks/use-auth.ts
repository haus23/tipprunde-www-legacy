import { Player } from '@haus23/dtp-types';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { userAtom } from '~/state/user';
import { useMasterdata } from './use-masterdata';

export function useAuth() {
  const user = useAtomValue(userAtom);
  const { players } = useMasterdata();

  const player = useMemo(() => {
    if (user) {
      for (const key of Object.keys(players)) {
        if (players[key].email === user.email) {
          return { id: key, name: players[key].name, email: players[key].email } satisfies Player;
        }
      }
    }
    return null;
  }, [user, players]);

  return {
    isAnonymous: user === null,
    player,
  };
}
