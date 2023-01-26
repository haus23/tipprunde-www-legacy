import { useCallback, useEffect, useState } from 'react';
import * as DropDownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { cn } from '~/utils/cn';

const themes = [
  { name: 'light', label: 'Light', icon: SunIcon },
  { name: 'dark', label: 'Dark', icon: MoonIcon },
  { name: '', label: 'System', icon: ComputerDesktopIcon },
];

export function ThemeSwitch() {
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
      <DropDownMenu.Trigger className="p-1 sm:p-2 mr-1 rounded-lg violet-cta-int focus:outline-none focus:ring-4 focus:ring-radix-violet7">
        <MoonIcon className="h-6 w-6 hidden dark:block" />
        <SunIcon className="h-6 w-6 block dark:hidden" />
      </DropDownMenu.Trigger>
      <DropDownMenu.Portal>
        <DropDownMenu.Content
          side="top"
          sideOffset={4}
          align="end"
          className="z-20 w-44 flex flex-col text-radix-mauve11 bg-radix-mauve2 rounded-md shadow-lg ring-1 ring-radix-mauve6 ring-opacity-5 focus:outline-none"
        >
          <DropDownMenu.Arrow className="fill-radix-mauve6 h-2 w-4"></DropDownMenu.Arrow>
          {themes.map((t) => {
            const Icon = t.icon;
            const isCurrent = t.name === theme;
            return (
              <DropDownMenu.Item
                key={t.label}
                onSelect={() => updateTheme(t.name)}
                className={cn(
                  'flex gap-x-2 pl-4 pr-2 py-2 font-semibold cursor-pointer',
                  'focus:outline-none focus:bg-radix-violet4 focus:text-radix-violet12',
                  isCurrent && 'text-radix-violet11'
                )}
              >
                <Icon className={cn('h-6 w-6')} />
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
