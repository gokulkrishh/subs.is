import Link from 'next/link'

import { LogoSvg, UserIcon } from '@/components/icons'

import { Button } from './ui/button'

export default async function Header() {
  return (
    <header className="relative mt-2 flex items-center justify-between px-4 py-3">
      <Link className="rounded-md active:scale-95 active:opacity-85" href="/">
        <h1 className="flex items-center gap-3 text-2xl font-black text-pink-600">
          <LogoSvg className="size-8" /> <span>Subs Tracker</span>
        </h1>
      </Link>
      <Button
        variant="outline"
        className="inline-flex size-12 items-center justify-center rounded-full border-0 p-1.5 shadow-none"
      >
        <Link href="/profile">
          <UserIcon className="text-foreground size-5 shrink-0" />
        </Link>
      </Button>
    </header>
  )
}
