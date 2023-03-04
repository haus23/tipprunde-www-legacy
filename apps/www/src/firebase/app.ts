import {
  FirebaseApp,
  FirebaseOptions,
  getApp as getFirebaseApp,
  getApps,
  initializeApp as initializeFirebaseApp,
} from 'firebase/app';

const options: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MSG_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

let app: FirebaseApp;
export function getApp() {
  if (!app) {
    app = getApps().length === 0 ? initializeFirebaseApp(options) : getFirebaseApp();
  }
  return app;
}

// Convenience wrapper to initialize firebase imperatively in main.tsx
export const initializeApp = () => {
  getApp();
};
