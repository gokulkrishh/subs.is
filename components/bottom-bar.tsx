'use client';

import { useState } from 'react';

import { Home, Settings } from 'lucide-react';

import { useUser } from './context/user';
import Add from './modal/add';
import SignupModal from './modal/signup';
import NavLink from './nav-link';

export default function BottomBar() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center backdrop-blur-lg mx-auto w-48 md:w-44 h-fit rounded-full border border-input bg-card-background px-2 py-1.5 md:py-1 md:px-1.5 fixed bottom-[18px] left-0 right-0">
        <div className="flex gap-3 md:gap-2 items-center w-fit">
          <NavLink shortcut="h" title="Home" href="/" className="rounded-full p-2.5 md:p-2">
            <Home className="w-6 h-6 text-primary" />
          </NavLink>
          <NavLink
            shortcut="s"
            title="Settings"
            onClick={(event: React.SyntheticEvent) => {
              if (!user?.email) {
                event?.preventDefault();
                setOpen(true);
              }
            }}
            href="/settings"
            className="rounded-full p-2.5"
          >
            <Settings className="w-6 h-6 text-primary" />
          </NavLink>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="h-6 border-r"></div>
        </div>
        <div className="flex items-center w-fit">
          <Add showSignup={setOpen} user={user} />
        </div>
      </div>
      {open && !user?.email ? <SignupModal open={open} onHide={setOpen} /> : null}
    </>
  );
}
