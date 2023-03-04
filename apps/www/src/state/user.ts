import { User } from 'firebase/auth';
import { atom, getDefaultStore } from 'jotai';
import { getAuth } from '~/firebase/auth';

export const userAtom = atom<User | null>(null);

// Sync atom with firebase auth state
const store = getDefaultStore();
const auth = getAuth();

auth.onAuthStateChanged((user) => store.set(userAtom, user));
