'use client';

import Image from 'next/image';
import Link from 'next/link';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { socialUrls } from 'config/urls';
import { createClient } from 'lib/supabase/client';
import { HelpCircleIcon, LogOut } from 'lucide-react';
import { User } from 'types/data';

import { GithubIcon } from './icons';

// https://stackoverflow.com/a/33919020/266535
const blurDataURL = `data:image/gif;base64,R0lGODlhAQABAPAAABsbG////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function Profile({ user }: { user: User | null }) {
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
          <DropdownMenuItem>
            <Link className="flex items-center" target="_blank" href={socialUrls.github}>
              <GithubIcon />
              Github
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="flex items-center" target="_blank" href={socialUrls.help}>
              <HelpCircleIcon className="h-4 w-4 mr-2" />
              Help
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
