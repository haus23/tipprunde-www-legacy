import { Outlet } from 'react-router-dom';
import AppHeader from '~/components/layout/app-header';

export default function RootLayout() {
  return (
    <div className="h-full neutral-app-bg neutral-app-text-contrast">
      <AppHeader />
      <main className="mx-auto max-w-5xl mt-6 sm:px-6 lg:px-8 pb-10">
        <Outlet />
      </main>
    </div>
  );
}
