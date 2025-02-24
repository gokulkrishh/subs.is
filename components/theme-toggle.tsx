'use client'

import { useTheme } from 'next-themes'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

import { MoonIcon, SunIcon } from './icons'
import { Button } from './ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="inline-flex w-fit p-2 px-3">
          <SunIcon className="h-10 w-10 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute h-10 w-10 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-0.5" align="end">
        <DropdownMenuItem className={cn({ 'bg-accent': theme === 'light' })} onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className={cn({ 'bg-accent': theme === 'dark' })} onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className={cn({ 'bg-accent': theme === 'system' })} onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
