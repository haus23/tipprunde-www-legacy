import { Link } from 'react-router-dom';
import { useChampionship } from '~/hooks/use-championship';
import Logo from '../brand/logo';
import ChampionshipSwitch from '../commands/championship-switch';
import LogOnOffSwitch from '../commands/logonoff-switch';
import ThemeSwitch from '../commands/theme-switch';
import NavDesktop from './nav-desktop';
import NavMobile from './nav-mobile';

const navItems = [
  { label: 'Tabelle', routeSegment: '', end: true },
  { label: 'Spieler', routeSegment: 'spieler', end: false },
  { label: 'Spiele', routeSegment: 'spiel', end: false },
];

export default function AppHeader() {
  const championship = useChampionship();

  return (
    <header className="flex justify-between px-4 h-16 sm:h-[80px] neutral-app-bg-subtl shadow border-b neutral-border">
      <div className="flex items-center gap-x-2">
        <Link to="/" className="hidden sm:block brand-app-text-contrast group focus:outline-none">
          <div className="flex items-center gap-x-2 p-1 rounded-lg group-focus:ring-4 group-focus:ring-neutral7">
            <Logo className="h-8 sm:h-10" />
            <h1 className="p-2 text-xl font-semibold">runde.tips</h1>
          </div>
        </Link>
        <NavDesktop navItems={navItems} />
        <NavMobile navItems={navItems} />
        <div className="sm:hidden">
          <span className="text-xl font-semibold">{championship.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <ChampionshipSwitch />
        <ThemeSwitch />
        <LogOnOffSwitch />
      </div>
    </header>
  );
}
