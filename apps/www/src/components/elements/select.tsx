import { Fragment, ReactElement } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import * as SelectPrimitive from '@radix-ui/react-select';

type OptionType = { id: string } & Record<string, any>;
type ExtractStringValueKeys<T> = { [I in keyof T]: T[I] extends string ? I : never }[Extract<
  keyof T,
  string
>];

type SelectProps<T extends OptionType, G extends OptionType> = {
  value: string;
  onValueChange(value: string): void;
  options: T[];
  displayValue?: ExtractStringValueKeys<T> | ((elt: T) => string);
  groups?: G[];
  groupKey?: ExtractStringValueKeys<T>;
  groupDisplayValue?: ExtractStringValueKeys<G> | ((elt: G) => string);
};

export default function Select<T extends OptionType, G extends OptionType>({
  value,
  onValueChange,
  options,
  displayValue,
  groups,
  groupKey,
  groupDisplayValue,
}: SelectProps<T, G>) {
  const displayFn = (item: T) => {
    if (typeof displayValue === 'undefined') {
      return item.id;
    } else if (typeof displayValue === 'string') {
      return item[displayValue];
    } else if (typeof displayValue === 'function') {
      return displayValue(item);
    }
  };

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="translate-y-[1px] grow sm:grow-0 basis-1/2 lg:basis-1/3 inline-flex items-center justify-between font-semibold p-1 pl-2 rounded shadow brand-cta-int border-2 brand-border-int focus:outline-none focus:ring-4 focus:ring-brand7">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="h-5 w-5 brand-app-text-contrast" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          align="end"
          sideOffset={8}
          collisionPadding={16}
          className="select-content p-2 overflow-hidden neutral-app-bg-subtl rounded-md shadow-lg ring-1 ring-neutral6 ring-opacity-5 focus:outline-none"
        >
          <SelectPrimitive.ScrollUpButton className="flex justify-center">
            <ChevronUpIcon className="h-5 w-5" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-1">
            {(groups || [undefined]).map((g) => {
              let GroupContainer: ReactElement;
              const children = options
                .filter((item) => (groupKey ? item[groupKey] === g?.id : true))
                .map((item) => (
                  <SelectPrimitive.Item
                    key={item.id}
                    value={item.id}
                    className="select-none relative flex items-center justify-between space-x-2 my-1 py-1 pl-2 pr-8 cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-neutral7 data-[state=checked]:text-brand11"
                  >
                    <SelectPrimitive.ItemText>{displayFn(item)}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator className="absolute right-0">
                      <CheckIcon className="p-1 h-6 w-6" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ));
              if (g) {
                const groupDisplayFn = (item: G) => {
                  if (typeof groupDisplayValue === 'undefined') {
                    return item.id;
                  } else if (typeof groupDisplayValue === 'string') {
                    return item[groupDisplayValue];
                  } else if (typeof groupDisplayValue === 'function') {
                    return groupDisplayValue(item);
                  }
                };
                GroupContainer = (
                  <SelectPrimitive.Group key={g.id}>
                    <SelectPrimitive.Label className="text-neutral11 text-sm">
                      {groupDisplayFn(g)}
                    </SelectPrimitive.Label>
                    {...children}
                  </SelectPrimitive.Group>
                );
              } else {
                GroupContainer = <Fragment key={'no-group'}>{...children}</Fragment>;
              }
              return GroupContainer;
            })}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex justify-center">
            <ChevronDownIcon className="h-5 w-5" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
