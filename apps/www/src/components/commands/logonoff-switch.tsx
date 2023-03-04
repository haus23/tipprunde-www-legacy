import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import * as DropDownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth } from '~/hooks/use-auth';
import { logOff } from '~/firebase/auth';
import Button from '../atoms/button';
import { classes } from '~/utils/classes';

export default function LogOnOffSwitch() {
  const { isAnonymous, player } = useAuth();
  const navigate = useNavigate();

  function handleLogOnOff() {
    if (!isAnonymous) {
      logOff();
    } else {
      navigate('/login');
    }
  }

  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger asChild>
        <Button color="brand" className="p-1.5" aria-label="Farbschema wählen">
          <UserIcon className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </DropDownMenu.Trigger>
      <DropDownMenu.Portal>
        <DropDownMenu.Content
          side="top"
          sideOffset={2}
          align="end"
          className="z-20 w-44 flex flex-col text-radix-mauve11 bg-radix-mauve2 rounded-md shadow-lg ring-1 ring-radix-mauve6 ring-opacity-5 focus:outline-none"
        >
          <DropDownMenu.Arrow className="fill-radix-mauve6 h-2 w-4 sm:mb-1"></DropDownMenu.Arrow>
          {isAnonymous ? (
            <DropDownMenu.Item
              onSelect={handleLogOnOff}
              className={classes(
                'px-4 py-2 font-semibold cursor-pointer',
                'focus:outline-none focus:bg-brand4 focus:text-brand12'
              )}
            >
              Anmelden
            </DropDownMenu.Item>
          ) : (
            <>
              <DropDownMenu.Label className="px-4 py-2 neutral-app-text-contrast flex flex-col gap-y-1">
                <span>{player?.name}</span>
                <span className="text-sm neutral-app-text">({player?.email})</span>
              </DropDownMenu.Label>
              <DropDownMenu.Separator className="m-2  h-[1px] bg-neutral6" />
              <DropDownMenu.Item
                onSelect={handleLogOnOff}
                className={classes(
                  'px-4 py-2 font-semibold cursor-pointer',
                  'focus:outline-none focus:bg-brand4 focus:text-brand12'
                )}
              >
                Abmelden
              </DropDownMenu.Item>
            </>
          )}
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  );
}
