import { useParams } from 'react-router-dom';

export default function NavMobile({
  navItems,
}: {
  navItems: { label: string; routeSegment: string; end: boolean }[];
}) {
  const params = useParams();
  return <button className="sm:hidden">Menu</button>;
}
