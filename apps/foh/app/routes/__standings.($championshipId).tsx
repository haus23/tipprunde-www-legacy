import { NavLink, Outlet } from '@remix-run/react';

export default function StandingsLayout() {
  return (
    <div style={{ fontFamily: 'system-ui', fontWeight: 500, lineHeight: '1.4' }}>
      <header>
        <h1>runde.tips</h1>
        <ul>
          <li>
            <NavLink to="">Tabelle</NavLink>
          </li>
          <li>
            <NavLink to="spieler">Spieler</NavLink>
          </li>
          <li>
            <NavLink to="spiele">Spiele</NavLink>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
