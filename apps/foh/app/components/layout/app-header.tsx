import { Link, NavLink } from '@remix-run/react';
import { cn } from '~/utils/cn';
import { Logo } from '../brand/logo';
import { ThemeSwitch } from '../commands/theme-switch';

const navItems = [
  { label: 'Tabelle', routeSegment: '' },
  { label: 'Spieler', routeSegment: 'spieler' },
  { label: 'Spiele', routeSegment: 'spiele' },
];

export function AppHeader() {
  return (
    <header className="flex items-center justify-between px-2 sm:px-4 bg-radix-mauve2 border-b border-radix-mauve6 shadow">
      <div className="flex items-center gap-x-8">
        <Link to="/" className="flex items-center gap-x-2 py-4">
          <Logo className="h-8 sm:h-10" />
          <h1 className="text-xl font-semibold">runde.tips</h1>
        </Link>
        <nav className="hidden sm:flex self-stretch items-stretch gap-x-2">
          {navItems.map((item) => (
            <NavLink
              to={item.routeSegment}
              key={item.label}
              className={({ isActive }) => cn('flex items-center')}
            >
              {({ isActive }) => <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
