declare namespace NodeJS {
  export interface ProcessEnv {
    LOG_LEVEL: 'info' | 'warn';
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
  }
}
