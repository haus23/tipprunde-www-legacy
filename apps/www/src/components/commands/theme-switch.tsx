import { useCallback, useEffect, useState } from 'react';
import * as DropDownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { classes } from '~/utils/classes';
import Button from '../atoms/button';

const themes = [
  { name: 'light', label: 'Light', icon: SunIcon },
  { name: 'dark', label: 'Dark', icon: MoonIcon },
  { name: '', label: 'System', icon: ComputerDesktopIcon },
];

export default function ThemeSwitch() {
  // Code as well in /public/theme.js
  function updateDOM() {
    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark' ||
        (!localStorage.theme && matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }

  const [theme, setTheme] = useState<string>();

  const updateTheme = useCallback((name: string) => {
    if (name) {
      localStorage.setItem('theme', name);
    } else {
      localStorage.removeItem('theme');
    }
    setTheme(name);
    updateDOM();
  }, []);

  // Load initial theme and watch system changes
  useEffect(() => {
    setTheme(localStorage.getItem('theme') || '');
    const mediaQuery = matchMedia('(prefers-color-scheme: dark)');
    const darkModeListener = (ev: MediaQueryListEvent) => {
      updateTheme('');
    };
    mediaQuery.addEventListener('change', darkModeListener);
    return () => mediaQuery.removeEventListener('change', darkModeListener);
  }, [updateTheme]);

  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger asChild>
        <Button color="brand" className="p-1.5" aria-label="Farbschema wählen">
          <MoonIcon className="h-5 w-5 md:h-6 md:w-6 hidden dark:block" />
          <SunIcon className="h-5 w-5 md:h-6 md:w-6 block dark:hidden" />
        </Button>
      </DropDownMenu.Trigger>
      <DropDownMenu.Portal>
        <DropDownMenu.Content
          side="top"
          sideOffset={2}
          align="end"
          className="z-20 w-44 flex flex-col text-radix-mauve11 bg-radix-mauve2 rounded-md shadow-lg ring-1 ring-radix-mauve6 ring-opacity-5 focus:outline-none"
        >
          <DropDownMenu.Arrow className="fill-radix-mauve6 h-2 w-4 sm:mb-1"></DropDownMenu.Arrow>
          {themes.map((t) => {
            const Icon = t.icon;
            const isCurrent = t.name === theme;
            return (
              <DropDownMenu.Item
                key={t.label}
                onSelect={() => updateTheme(t.name)}
                className={classes(
                  'flex gap-x-2 pl-4 pr-2 py-2 font-semibold cursor-pointer',
                  'focus:outline-none focus:bg-brand4 focus:text-brand12',
                  isCurrent && 'text-brand11'
                )}
              >
                <Icon className={classes('h-6 w-6')} />
                <span>{t.label}</span>
                {isCurrent && <CheckIcon className="ml-auto h-6 w-6" />}
              </DropDownMenu.Item>
            );
          })}
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  );
}
