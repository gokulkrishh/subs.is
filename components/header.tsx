import Link from 'next/link'

import { IconSvg } from '@/app/icon'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export default async function Header() {
  return (
    <header className={cn(`relative mt-2 flex items-center justify-between px-4 py-3`)}>
      <Link className="rounded-md active:scale-95 active:opacity-85" href="/">
        <h1 className="flex items-center gap-2 text-2xl font-black text-pink-600">
          <IconSvg className="size-8" /> <span>Subs Tracker</span>
        </h1>
      </Link>
      <Button>Sign in</Button>
    </header>
  )
}
