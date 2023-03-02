import { ElementType, ReactNode, useRef, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { classes } from '~/utils/classes';
import { motion } from 'framer-motion';

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
      <PopoverPrimitive.Trigger className={classes(className, 'focus:outline-none')}>
        <TriggerIcon className="h-5 w-5" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          asChild
          side="top"
          sideOffset={2}
          align="end"
          collisionPadding={8}
          className="brand-app-text-contrast neutral-app-bg-subtl rounded-md shadow-lg ring-1 ring-neutral6 ring-opacity-5 focus:outline-none"
        >
          <motion.div
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, y: 5, scaleX: 0.5 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
          >
            <PopoverPrimitive.Arrow className="fill-neutral2" />
            {children}
          </motion.div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export default Tooltip;
