import { Link, NavLink } from '@remix-run/react';
import { useChampionship } from '~/hooks/use-championship';
import { cn } from '~/utils/cn';
import { Logo } from '../brand/logo';
import { ChampionshipSwitch } from '../commands/championship-switch';
import { ThemeSwitch } from '../commands/theme-switch';
import { MobileNav } from './mobile-nav';

const navItems = [
  { label: 'Tabelle', routeSegment: '', end: true },
  { label: 'Spieler', routeSegment: 'spieler', end: false },
  { label: 'Spiele', routeSegment: 'spiele', end: false },
];

export function AppHeader() {
  const championship = useChampionship();
  return (
    <header className="flex items-center justify-between px-4 bg-radix-mauve2 border-b border-radix-mauve6 shadow">
      <div className="flex items-center gap-x-2">
        <MobileNav className="sm:hidden py-3" navItems={navItems} />
        <Link to="/" className="hidden sm:flex group items-center gap-x-2 py-3 focus:outline-none ">
          <div className="flex items-center rounded-lg p-1 group-focus:ring-4 group-focus:ring-radix-mauve7">
            <Logo className="h-8 sm:h-10" />
            <h1 className="p-2 text-xl font-semibold">runde.tips</h1>
          </div>
        </Link>
        <div className="sm:hidden">
          <span className="text-xl font-semibold">{championship.name}</span>
        </div>
        <nav className="hidden sm:flex self-stretch items-stretch gap-x-2">
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
                  'group px-2 flex items-center focus:outline-none border-b-2 translate-y-[2px]'
                )
              }
            >
              <span className="p-1 sm:p-2 rounded-lg group-hover:bg-radix-mauve5 group-focus:ring-4 group-focus:ring-radix-mauve7">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-x-2">
        <ChampionshipSwitch />
        <ThemeSwitch />
      </div>
    </header>
  );
}
