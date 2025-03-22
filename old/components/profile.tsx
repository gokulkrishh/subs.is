'use client';

import Image from 'next/image';
import Link from 'next/link';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { socialUrls } from 'config/urls';
import { createClient } from 'lib/supabase/client';
import { User } from 'types/data';

import { GithubIcon, HelpIcon, LogoutIcon } from './icons';

export default function Profile({ user }: { user: User | null }) {
  if (!user?.email) return null;

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Image
            priority
            className="h-9 w-9 rounded-full border border-input"
            src={user?.avatar_url ?? `/images/avatar.svg`}
            alt={user?.full_name ?? 'Demo account'}
            width={36}
            height={36}
            style={{ maxWidth: '100%', objectFit: 'cover' }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="hidden max-sm:block">
            <Link className="flex items-center" target="_blank" href={socialUrls.github}>
              <GithubIcon className="h-4 w-4 mr-2" />
              Source
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center" target="_blank" href={socialUrls.help}>
              <HelpIcon className="h-4 w-4 mr-2" />
              Help
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogoutIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
