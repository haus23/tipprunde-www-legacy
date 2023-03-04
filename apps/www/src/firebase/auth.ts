import {
  Auth,
  getAuth as getFirebaseAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth';
import { getApp } from './app';

let auth: Auth;
export function getAuth() {
  if (!auth) {
    auth = getFirebaseAuth(getApp());
  }
  return auth;
}

export function checkEmailLink(link: string) {
  return isSignInWithEmailLink(auth, link);
}

export async function logOnWithEmailLink(email: string, link: string) {
  try {
    return await signInWithEmailLink(auth, email, link);
  } catch (error) {
    return false;
  }
}

export async function sendLogOnEmailLink(email: string) {
  const actionCodeSettings = {
    url: `${location.origin}/validate-email`,
    handleCodeInApp: true,
  };
  return sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export function logOff() {
  signOut(auth);
}
