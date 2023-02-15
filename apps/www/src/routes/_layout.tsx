import { MasterData } from '@haus23/dtp-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import AppHeader from '~/components/layout/app-header';

export type LoaderReturnType = MasterData;

export async function loader() {
  return fetch(`${import.meta.env.VITE_API_SERVER}/api/v1/masterdata`);
}

export const shouldRevalidateFunction = () => false;

export default function RootLayout() {
  const location = useLocation();
  return (
    <div className="h-full">
      <AppHeader />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ x: '+10%', opacity: 0 }}
          animate={{ x: '0', opacity: 1 }}
          exit={{ x: '+10%', opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="mx-auto max-w-5xl mt-6 sm:px-6 lg:px-8 pb-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <ScrollRestoration />
    </div>
  );
}
