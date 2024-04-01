import Link from 'next/link';

import { ThemeToggle } from 'components/theme-toggle';
import { cn } from 'lib/utils';
import { User } from 'types/data';

import { Icon } from './icons';
import Profile from './profile';

export default async function Header({ user }: { user: User | null }) {
  return (
    <header className={cn(`flex relative justify-between items-center`)}>
      <Link
        className="active:opacity-85 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        href="/"
      >
        <h1 className="font-black flex items-center gap-2 text-pink-600 text-2xl">
          <Icon /> <span className="mt-0.5">Subs Tracker</span>
        </h1>
        <div
          className={cn('absolute text-white top-0 font-medium text-[11px] p-0.5 px-1 rounded bg-pink-600', {
            '-right-11': !user?.email,
            '-right-10': user?.email,
          })}
        >
          {!user?.email ? 'demo' : 'beta'}
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Profile user={user} />
        <ThemeToggle />
      </div>
    </header>
  );
}
