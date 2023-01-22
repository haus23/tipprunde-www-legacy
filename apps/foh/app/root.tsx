import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'runde.tips',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader() {
  const response = await fetch(`${process.env.API_URL}/championships`);
  return response.json();
}

export const shouldRevalidate = () => false;

export default function App() {
  return (
    <html lang="de">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
