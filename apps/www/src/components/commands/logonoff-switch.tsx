import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from '~/hooks/use-auth';
import Button from '../atoms/button';

export default function LogOnOffSwitch() {
  const { isAnonymous } = useAuth();

  return (
    <Button color="brand" className="p-1.5" aria-label="Farbschema wählen">
      {isAnonymous ? (
        <UserIcon className="h-6 w-6" />
      ) : (
        <ArrowRightOnRectangleIcon className="h-6 w-6" />
      )}
    </Button>
  );
}
