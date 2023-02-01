import { ComponentPropsWithRef, forwardRef, ReactNode, Ref } from 'react';
import { twMerge } from 'tailwind-merge';
import { classes } from '~/utils/classes';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  color: 'brand' | 'neutral';
};

function Button(
  { children, className, color, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      ref={ref}
      className={twMerge(
        classes(
          'py-2 px-4 rounded-lg focus:outline-none focus:ring-4',
          color === 'brand'
            ? 'brand-cta-int focus:ring-brand7'
            : 'neutral-cta-int focus:ring-neutral7'
        ),
        className
      )}
    >
      {children}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
