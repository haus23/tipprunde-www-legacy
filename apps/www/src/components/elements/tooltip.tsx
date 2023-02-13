import { ElementType, ReactNode, useRef, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import * as PopoverPrimitive from '@radix-ui/react-popover';

function Tooltip({
  children,
  className,
  icon,
}: {
  children: ReactNode;
  className?: string;
  icon?: ElementType;
}) {
  const TriggerIcon = icon || InformationCircleIcon;

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger className={className}>
        <TriggerIcon className="h-5 w-5" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="top"
          sideOffset={2}
          align="end"
          className="px-4 py-2 brand-app-text-contrast neutral-app-bg-subtl rounded-md shadow-lg ring-1 ring-neutral6 ring-opacity-5 focus:outline-none"
        >
          <PopoverPrimitive.Arrow className="fill-neutral2" />
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export default Tooltip;
