import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'runde.tips',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="de" className="dark">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-radix-mauve1 text-radix-mauve12">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
