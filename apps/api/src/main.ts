import { createApp, createRouter, eventHandler, toNodeListener } from 'h3';
import { listen } from 'listhen';

const app = createApp();

const router = createRouter()
  .get(
    '/',
    eventHandler(() => '<h1 style="font-family: system-ui; font-weight: 500">runde.tips</h1>')
  )
  .get(
    '/api/v1/championships',
    eventHandler((event) => `Turniere`)
  )
  .get(
    '/api/v1/ranking/:championshipId',
    eventHandler((event) => `Stand ${event.context.params.championshipId}`)
  );

app.use(router);

listen(toNodeListener(app), { port: 5432 });
