import { Outlet, ScrollRestoration } from 'react-router-dom';
import AppHeader from '~/components/layout/app-header';

export async function loader() {
  return fetch(`${import.meta.env.VITE_API_SERVER}/api/v1/masterdata`);
}

export const shouldRevalidateFunction = () => false;

export default function RootLayout() {
  return (
    <div className="h-full">
      <AppHeader />
      <main className="mx-auto max-w-5xl mt-6 sm:px-6 lg:px-8 pb-10">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
