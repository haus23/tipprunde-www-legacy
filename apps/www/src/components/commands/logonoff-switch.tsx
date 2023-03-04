import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { logOff } from '~/firebase/auth';
import { useAuth } from '~/hooks/use-auth';
import Button from '../atoms/button';

export default function LogOnOffSwitch() {
  const { isAnonymous } = useAuth();
  const navigate = useNavigate();

  function handleLogOnOff() {
    if (!isAnonymous) {
      logOff();
    } else {
      navigate('/login');
    }
  }

  return (
    <Button onClick={handleLogOnOff} color="brand" className="p-1.5" aria-label="Farbschema wählen">
      {isAnonymous ? (
        <UserIcon className="h-6 w-6" />
      ) : (
        <ArrowRightOnRectangleIcon className="h-6 w-6" />
      )}
    </Button>
  );
}
