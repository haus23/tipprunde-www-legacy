import { NavLink, useParams } from 'react-router-dom';
import { classes } from '~/utils/classes';

export default function NavDesktop({
  navItems,
}: {
  navItems: { label: string; routeSegment: string; end: boolean }[];
}) {
  const params = useParams();
  return (
    <nav className="hidden sm:flex self-stretch items-center gap-x-2 mt-1">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={[params.championshipId, item.routeSegment].filter(Boolean).join('/')}
          end={item.end}
          className={({ isActive }) =>
            classes(
              isActive ? 'border-brand8' : 'border-transparent hover:border-neutral8',
              'flex items-center px-2 self-stretch group focus:outline-none border-b-2'
            )
          }
        >
          <span className="p-1 sm:p-2 rounded-lg group-hover:bg-neutral5 group-focus:ring-4 group-focus:ring-neutral7">
            {item.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
