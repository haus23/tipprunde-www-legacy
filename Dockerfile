FROM node:lts-alpine AS base

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

FROM base as dependencies

ENV NODE_ENV=development
WORKDIR /usr/src/workspace

COPY ./pnpm-lock.yaml .npmrc ./
RUN pnpm fetch

FROM dependencies as build

COPY . .

RUN pnpm install --offline

ENV NODE_ENV=production
RUN pnpm build:api
RUN pnpm prune --prod

FROM build

EXPOSE 5432
CMD ["node", "./apps/api/.output/server/index.mjs"]
