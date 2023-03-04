import { useAtomValue } from 'jotai';
import { userAtom } from '~/state/user';

export function useAuth() {
  const user = useAtomValue(userAtom);

  return {
    isAnonymous: user === null,
  };
}
