import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';

import Button from '../atoms/button';
import { classes } from '~/utils/classes';
import Logo from '../brand/logo';

export default function NavMobile({
  navItems,
}: {
  navItems: { label: string; routeSegment: string; end: boolean }[];
}) {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button color="brand" className="sm:hidden p-1.5">
          <Bars3Icon className="h-6 w-6" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <Dialog.Content className="fixed top-4 inset-x-4 neutral-app-bg-subtl rounded-md shadow-md ring-1 ring-neutral6 ring-opacity-5">
          <Dialog.Title className="sr-only">Hauptmenü</Dialog.Title>
          <nav className="divide-y divide-neutral6">
            <Link
              to="/"
              className="inline-flex items-center gap-x-2 px-2 py-4 focus:outline-neutral8"
            >
              <Logo className="h-8" />
              <h1 className="text-xl font-semibold">runde.tips</h1>
            </Link>
            <div className="flex flex-col gap-y-2 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={[params.championshipId, item.routeSegment].filter(Boolean).join('/')}
                  end={item.end}
                  className={({ isActive }) =>
                    classes(
                      isActive
                        ? 'border-brand8 text-brand11'
                        : 'border-transparent hover:border-neutral8 hover:text-brand12',
                      'mx-2 p-2 font-semibold text-neutral11 border-l-4 focus:outline-neutral8'
                    )
                  }
                >
                  <span className="">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>
          <Dialog.DialogClose className="absolute top-4 right-4 p-1 focus:outline-neutral8">
            <XMarkIcon className="h-6 w-6" />
          </Dialog.DialogClose>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
