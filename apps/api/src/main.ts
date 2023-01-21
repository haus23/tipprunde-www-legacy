import { createApp, createRouter, eventHandler, toNodeListener } from 'h3';
import { listen } from 'listhen';
import { getChampionships } from './queries/get-championships';
import { ChampionshipId } from './model/championship';

const app = createApp();

const router = createRouter()
  .get(
    '/',
    eventHandler(() => '<h1 style="font-family: system-ui; font-weight: 500">runde.tips</h1>')
  )
  .get(
    '/api/v1/championships',
    eventHandler(() => getChampionships())
  )
  .get(
    '/api/v1/ranking/:championshipId',
    eventHandler((event) => {
      const championshipId = ChampionshipId.parse(event.context.params.championshipId);
      return `Stand ${championshipId}` + process.env.FIREBASE_PROJECT_ID;
    })
  );

app.use(router);

listen(toNodeListener(app), { port: 5432 });
