import { Menu } from '@headlessui/react';
import { CheckIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
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
    <Menu as="div" className="relative flex items-center">
      <Menu.Button className="p-1 sm:p-2 mr-1 rounded-lg violet-cta-int focus:outline-none focus:ring-4 focus:ring-radix-violet7">
        <MoonIcon className="h-6 w-6 hidden dark:block" />
        <SunIcon className="h-6 w-6 block dark:hidden" />
      </Menu.Button>
      <Menu.Items className="absolute top-16 flex flex-col right-0 py-1 w-44 origin-top-right text-radix-mauve11 bg-radix-mauve2 rounded-md shadow-lg ring-1 ring-radix-mauve6 ring-opacity-5 focus:outline-none">
        {themes.map((t) => (
          <Menu.Item key={t.label}>
            {({ active }) => {
              const Icon = t.icon;
              const isCurrent = t.name === theme;
              return (
                <button
                  onClick={() => updateTheme(t.name)}
                  className={cn(
                    'flex gap-x-2 pl-4 pr-2 py-2 font-semibold',
                    active
                      ? 'bg-radix-violet4 text-radix-violet12'
                      : isCurrent && 'text-radix-violet11'
                  )}
                >
                  <Icon className={cn('h-6 w-6')} />
                  <span>{t.label}</span>
                  {isCurrent && <CheckIcon className="ml-auto h-6 w-6" />}
                </button>
              );
            }}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
