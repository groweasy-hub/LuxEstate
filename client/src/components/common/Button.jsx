'use client';
import { cn } from '@/lib/utils';

export default function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  const base = 'btn btn-ripple hover-nudge-right';
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };
  const sizes = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
