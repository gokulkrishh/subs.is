'use client';

import { useState } from 'react';

import { User } from 'types/data';

import { HomeIcon, SettingsIcon } from './icons';
import Add from './modal/add';
import SignupModal from './modal/signup';
import NavLink from './nav-link';

export default function BottomBar({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center backdrop-blur-lg mx-auto w-48 md:w-44 h-fit rounded-full border border-input  px-2 py-1.5 md:py-1 md:px-1.5 fixed bottom-[18px] left-0 right-0">
        <div className="flex gap-3 md:gap-2 items-center w-fit">
          <NavLink
            Icon={(props: any) => <HomeIcon {...props} />}
            shortcut="h"
            title="Home"
            href="/"
            className="rounded-full p-2.5 md:p-2"
          ></NavLink>
          <NavLink
            Icon={(props: any) => <SettingsIcon {...props} />}
            shortcut="s"
            title="Settings"
            href="/settings"
            className="rounded-full p-2.5"
          ></NavLink>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="h-6 border-r"></div>
        </div>
        <div className="flex items-center w-fit">
          <Add showSignup={setOpen} user={user} />
        </div>
      </div>
      {open ? <SignupModal user={user} open={open} onHide={setOpen} /> : null}
    </>
  );
}
