'use client';

import Image from 'next/image';
import Link from 'next/link';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu';
import { socialUrls } from 'config/urls';
import { HelpCircleIcon, LogOut } from 'lucide-react';

import { useAuth } from './context/auth';
import { GithubIcon } from './icons';

export default function Profile() {
  const { user, supabase } = useAuth();

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Image
            priority
            className="h-8 w-8 rounded-full border border-input"
            src={user?.user_metadata?.avatar_url ?? `/images/avatar.svg`}
            alt={user?.user_metadata?.full_name ?? 'Demo account'}
            width={100}
            height={100}
            style={{ maxWidth: '100%', objectFit: 'fill' }}
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
