/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
  }
}
