import Link from 'next/link'

import { LogoSvg, UserIcon } from '@/components/icons'

export default async function Header() {
  return (
    <header className="relative mt-2 flex items-center justify-between px-4 py-3">
      <Link className="rounded-md active:scale-95 active:opacity-85" href="/">
        <h1 className="flex items-center gap-3 text-2xl font-black text-pink-600">
          <LogoSvg className="size-8" /> <span>Subs Tracker</span>
        </h1>
      </Link>
      <Link
        className="bg-background inline-flex size-10 items-center justify-center rounded-full border p-1.5"
        href="/profile"
      >
        <UserIcon className="text-accent-foreground dark:text-foreground size-5 shrink-0" />
      </Link>
    </header>
  )
}
