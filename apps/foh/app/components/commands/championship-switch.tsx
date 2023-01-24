import { useNavigate } from '@remix-run/react';
import { Fragment, useState } from 'react';
import type { Championship } from 'dtp-types';

import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { cn } from '~/utils/cn';
import { useMasterdata } from '~/hooks/use-masterdata';

export function ChampionshipSwitch() {
  const { championship, championships, view } = useMasterdata();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const activeChampionshipId = championship.id;

  function onSelect(championship: Championship) {
    setOpen(false);
    const viewSegment = view && `/${view}`;
    const route = `/${championship.id}${viewSegment}`;
    navigate(route);
  }

  const filteredChampionships =
    query === ''
      ? championships
      : championships.filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) || c.id.includes(query.toLowerCase())
        );

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-2 p-1 sm:p-2 mr-1 rounded-lg violet-cta-int focus:outline-none focus:ring-4 focus:ring-radix-violet7"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
          <span className="hidden sm:block">Turnier</span>
        </button>
      </div>
      <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')}>
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
              <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-radix-mauve6 overflow-hidden rounded-xl bg-radix-mauve2 shadow-2xl ring-1 ring-radix-mauve6 ring-opacity-5 transition-all">
                <Combobox onChange={onSelect}>
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-radix-mauve11"
                      aria-hidden="true"
                    />
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 font-semibold text-radix-violet12 placeholder-radix-mauve11 focus:outline-none"
                      placeholder="Turnier..."
                      onChange={(ev) => setQuery(ev.target.value)}
                    />
                  </div>
                  {filteredChampionships.length > 0 && (
                    <Combobox.Options
                      static
                      className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-radix-mauve11"
                    >
                      {filteredChampionships.map((c) => (
                        <Combobox.Option
                          key={c.id}
                          value={c}
                          className={({ active }) =>
                            cn(
                              'flex items-center justify-between cursor-default select-none px-4 py-2 font-semibold',
                              active
                                ? 'bg-radix-violet4 text-radix-violet12'
                                : activeChampionshipId === c.id && 'text-radix-violet11'
                            )
                          }
                        >
                          <span>{c.name}</span>
                          {activeChampionshipId === c.id && <CheckIcon className="h-6 w-6" />}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                  {query !== '' && filteredChampionships.length === 0 && (
                    <p className="p-4 text-radix-mauve11 font-semibold">Kein Turnier gefunden.</p>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
