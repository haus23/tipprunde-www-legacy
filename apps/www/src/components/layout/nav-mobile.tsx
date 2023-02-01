import { useParams } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Button from '../atoms/button';

export default function NavMobile({
  navItems,
}: {
  navItems: { label: string; routeSegment: string; end: boolean }[];
}) {
  const params = useParams();
  return (
    <Button color="brand" className="sm:hidden p-1.5">
      <Bars3Icon className="h-6 w-6" />
    </Button>
  );
}
