import { getAuth, User } from 'firebase/auth';
import { atom, getDefaultStore } from 'jotai';
import { getApp } from '~/firebase/initialize-app';

export const userAtom = atom<User | null>(null);

// Sync atom with firebase auth state
const store = getDefaultStore();
const auth = getAuth(getApp());

auth.onAuthStateChanged((user) => store.set(userAtom, user));
