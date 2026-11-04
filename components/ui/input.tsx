import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-subtle selection:bg-primary selection:text-primary-foreground border-line-strong bg-background h-11 w-full min-w-0 rounded-lg border px-3.5 py-1 text-base transition-[color,border-color,box-shadow] outline-none hover:border-line-bold file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-line-bold focus-visible:ring-foreground/10 focus-visible:ring-[3px]',
        'aria-invalid:ring-danger/20 aria-invalid:border-danger',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
