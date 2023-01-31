import * as SelectPrimitive from '@radix-ui/react-select';

type OptionType = { id: string } & Record<string, any>;
type ExtractStringValueKeys<T> = { [I in keyof T]: T[I] extends string ? I : never }[Extract<
  keyof T,
  string
>];

type SelectProps<T extends OptionType> = {
  value: string;
  onValueChange(value: string): void;
  options: T[];
  displayValue?: ExtractStringValueKeys<T> | ((elt: T) => string);
};

export function Select<T extends OptionType>({
  value,
  onValueChange,
  options,
  displayValue,
}: SelectProps<T>) {
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
      <SelectPrimitive.Trigger>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content>
          <SelectPrimitive.ScrollUpButton />
          <SelectPrimitive.Viewport>
            {options.map((item) => (
              <SelectPrimitive.Item key={item.id} value={item.id}>
                <SelectPrimitive.ItemText>{displayFn(item)}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator />
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
