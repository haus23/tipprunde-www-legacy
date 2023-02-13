import { useEffect, useState } from 'react';
import { CheckIcon, FolderIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { Command } from 'cmdk';
import commandScore from 'command-score';

import { useMasterdata } from '~/hooks/use-masterdata';

import './championship-switch.css';
import { useChampionship } from '~/hooks/use-championship';
import { Championship } from '@haus23/dtp-types';
import { classes } from '~/utils/classes';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/button';

export default function ChampionshipSwitch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { championships } = useMasterdata();
  const currentChampionship = useChampionship();

  useEffect(() => {
    const handleTriggerKey = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleTriggerKey);
    return () => document.removeEventListener('keydown', handleTriggerKey);
  }, []);

  function filter(value: string, search: string) {
    const c = championships.find((c) => c.id === value) as Championship;
    return commandScore(c.name, search);
  }

  function handleSelect(value: string) {
    setOpen(false);
    navigate(`/${value}`);
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        color="brand"
        className=" flex items-center gap-x-2 p-1.5 sm:px-4"
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
        <span className="hidden sm:block">Turnier</span>
      </Button>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        className=""
        label="Turnierwechsel"
        filter={filter}
      >
        <Command.Input
          placeholder="Turnier"
          className="w-full rounded-md border-0 neutral-app-bg-subtl px-4 py-2.5 neutral-app-text-contrast placeholder:neutral-app-text focus:outline-none sm:text-sm"
        />
        <Command.List className="border-t neutral-border p-2">
          <Command.Empty>
            <div className="py-14 px-4 text-center sm:px-14">
              <FolderIcon className="mx-auto h-6 w-6 neutral-app-text" aria-hidden="true" />
              <p className="mt-4 font-semibold neutral-app-text">
                Kein Turnier passt zu der Suche.
              </p>
            </div>
          </Command.Empty>
          {championships.map((c) => (
            <Command.Item
              key={c.id}
              value={c.id}
              onSelect={handleSelect}
              className={classes(
                'flex items-center justify-between cursor-default select-none px-4 py-2 font-semibold rounded-md aria-selected:neutral-bg',
                currentChampionship.id === c.id && 'brand-app-text'
              )}
            >
              <span>{c.name}</span>
              {currentChampionship.id === c.id && <CheckIcon className="h-6 w-6" />}
            </Command.Item>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
