import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-line-strong bg-background placeholder:text-subtle hover:border-line-bold focus-visible:border-line-bold focus-visible:ring-foreground/10 aria-invalid:ring-danger/20 aria-invalid:border-danger flex field-sizing-content min-h-16 w-full rounded-lg border px-3.5 py-3 text-base transition-[color,border-color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
