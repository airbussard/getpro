'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {/* Content */}
      {children}
    </div>
  );
};

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative z-50 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden',
          {
            'max-w-sm': size === 'sm',
            'max-w-md': size === 'md',
            'max-w-lg': size === 'lg',
            'max-w-4xl': size === 'xl',
            'max-w-full h-full rounded-none': size === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalContent.displayName = 'ModalContent';

const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800', className)}
      {...props}
    />
  )
);

ModalHeader.displayName = 'ModalHeader';

const ModalTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
);

ModalTitle.displayName = 'ModalTitle';

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
    {...props}
  />
));

ModalDescription.displayName = 'ModalDescription';

const ModalBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
);

ModalBody.displayName = 'ModalBody';

const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 p-6 border-t border-gray-200 dark:border-gray-800', className)}
      {...props}
    />
  )
);

ModalFooter.displayName = 'ModalFooter';

interface ModalCloseProps {
  onClose: () => void;
}

const ModalClose = ({ onClose }: ModalCloseProps) => (
  <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
    <X className="h-4 w-4" />
  </Button>
);

export { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose };
