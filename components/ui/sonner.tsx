'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <Sonner
      position={isMobile ? 'top-center' : 'bottom-right'}
      theme={resolvedTheme as ToasterProps['theme']}
      className="toaster group"
      visibleToasts={2}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
