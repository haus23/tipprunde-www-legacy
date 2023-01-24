import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink, useLocation } from '@remix-run/react';
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
      <button
        onClick={() => setOpen(true)}
        className="p-1 sm:p-2 mr-1 rounded-lg violet-cta-int focus:outline-none focus:ring-4 focus:ring-radix-violet7"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-overlay fixed inset-0 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto px-4 pt-20 sm:pt-24 sm:px-6 md:px-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="absolute w-2/3 top-4 right-4 transform divide-y divide-radix-mauve6 overflow-hidden rounded-xl bg-radix-mauve2 shadow-2xl ring-1 ring-radix-mauve6 ring-opacity-5 transition-all">
                <div className="flex items-center justify-between p-2">
                  <Link to="/" className="flex items-center p-1 gap-x-2 focus:outline-radix-mauve8">
                    <Logo className="h-8" />
                    <h1 className="rounded-lg text-xl font-semibold">runde.tips</h1>
                  </Link>
                  <button onClick={() => setOpen(false)} className="p-1 focus:outline-radix-mauve8">
                    <XMarkIcon className="h-6 w-6" />
                  </button>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
