import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'border-transparent bg-blue-600 text-white': variant === 'default',
          'border-transparent bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100':
            variant === 'secondary',
          'border-transparent bg-red-600 text-white': variant === 'destructive',
          'text-gray-900 dark:text-gray-100': variant === 'outline',
          'border-transparent bg-green-600 text-white': variant === 'success',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
