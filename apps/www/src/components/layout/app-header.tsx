import { Link } from 'react-router-dom';
import Logo from '../brand/logo';
import NavDesktop from './nav-desktop';
import NavMobile from './nav-mobile';

const navItems = [
  { label: 'Tabelle', routeSegment: '', end: true },
  { label: 'Spieler', routeSegment: 'spieler', end: false },
  { label: 'Spiele', routeSegment: 'spiele', end: false },
];

export default function AppHeader() {
  return (
    <header className="flex px-4 h-14 sm:h-20 neutral-app-bg-subtl shadow border-b neutral-border">
      <div className="flex items-center gap-x-2">
        <Link to="/" className="hidden sm:block brand-app-text-contrast group focus:outline-none">
          <div className="flex items-center gap-x-2 p-1 rounded-lg group-focus:ring-4 group-focus:ring-neutral7">
            <Logo className="h-8 sm:h-10" />
            <h1 className="p-2 text-xl font-semibold">runde.tips</h1>
          </div>
        </Link>
        <NavDesktop navItems={navItems} />
        <NavMobile navItems={navItems} />
      </div>
    </header>
  );
}
