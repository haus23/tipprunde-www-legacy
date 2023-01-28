import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from '@remix-run/react';
import * as Dialog from '@radix-ui/react-dialog';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from '../brand/logo';
import { cn } from '~/utils/cn';

type MobileNavProps = {
  className?: string;
  navItems: { label: string; routeSegment: string; end: boolean }[];
};
export function MobileNav({ className, navItems }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className={className}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="p-1 sm:p-2 mr-1 rounded-lg violet-cta-int focus:outline-none focus:ring-4 focus:ring-radix-violet7">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-overlay fixed inset-0" />
          <Dialog.Content className="fixed top-4 inset-x-4 divide-y divide-radix-mauve6 overflow-y-auto rounded-xl shadow-2xl ring-1 ring-radix-mauve6 ring-opacity-5 bg-radix-mauve2">
            <Dialog.Title className="sr-only">Hauptmenü</Dialog.Title>
            <div className="flex items-center justify-between p-2">
              <Link to="/" className="flex items-center p-1 gap-x-2 focus:outline-radix-mauve8">
                <Logo className="h-8" />
                <h1 className="rounded-lg text-xl font-semibold">runde.tips</h1>
              </Link>
              <Dialog.Close className="p-1 focus:outline-radix-mauve8">
                <XMarkIcon className="h-6 w-6" />
              </Dialog.Close>
            </div>
            <div className="flex flex-col p-2 pb-4 gap-y-2">
              {navItems.map((item) => (
                <NavLink
                  to={item.routeSegment}
                  key={item.label}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      isActive
                        ? 'border-radix-violet8'
                        : 'border-transparent hover:border-radix-mauve8',
                      'group p-2 flex items-center focus:outline-radix-mauve8 border-l-4 translate-y-[2px]'
                    )
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
