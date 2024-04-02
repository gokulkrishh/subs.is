import Link from 'next/link';

import { ThemeToggle } from 'components/theme-toggle';
import { cn } from 'lib/utils';
import { User } from 'types/data';

import { Icon } from './icons';
import FeedbackModal from './modal/feedback';
import Profile from './profile';
import SignupButton from './signup-button';

export default async function Header({ user }: { user: User | null }) {
  return (
    <header className={cn(`flex h-9 mt-1 relative justify-between items-center`)}>
      <Link
        className="active:opacity-85 -mt-0.5 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        href="/"
      >
        <h1 className="font-black flex items-center gap-2 text-pink-600 text-2xl">
          <Icon /> <span>Subs Tracker</span>
        </h1>
        {/* {!user?.email ? (
          <div className={'absolute text-white top-0 font-medium text-[11px] p-0.5 px-1 rounded -right-11 bg-blue-600'}>
            demo
          </div>
        ) : null} */}
      </Link>
      <div className="flex items-center gap-4">
        <FeedbackModal />
        <Profile user={user} />
      </div>
    </header>
  );
}
