import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { getMasterdata } from './queries/get-masterdata';

import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'runde.tips',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({ params }: LoaderArgs) {
  return getMasterdata();
}

export const shouldRevalidate = () => false;

export default function App() {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
        <script src="/theme.js"></script>
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
