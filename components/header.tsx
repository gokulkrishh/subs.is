'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { UserIcon } from '@/components/icons'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="relative mt-2 flex items-center justify-between px-4 py-3">
      <Link className="rounded-md transition-all active:scale-95 active:opacity-85" href="/">
        <h1 className="flex items-center gap-3 text-2xl font-black text-pink-600">
          <span>Subs Tracker</span>
        </h1>
      </Link>
      <Button
        asChild
        variant="outline"
        className={cn(
          `text-foreground inline-flex size-12! shrink-0 items-center justify-center rounded-full border-0 p-1.5 shadow-none`,
          { 'bg-accent dark:text-white': pathname === '/profile' },
        )}
      >
        <Link href="/profile">
          <UserIcon className="text-foreground size-5 shrink-0" />
        </Link>
      </Button>
    </header>
  )
}
