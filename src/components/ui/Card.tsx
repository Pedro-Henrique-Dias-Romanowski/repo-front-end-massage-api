import { type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export function Card({ padded = true, className, children, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-white shadow-sm border border-brand-100',
        padded && 'p-6',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
