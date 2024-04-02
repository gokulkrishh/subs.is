'use client';

import { useState } from 'react';

import { User } from 'types/data';

import SignupModal from './modal/signup';
import { Button } from './ui/button';

export default function SignupButton({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);

  if (user?.email) return null;

  return (
    <>
      <Button className="font-medium" onClick={() => setOpen(!open)} variant={'default'} size={'sm'}>
        Sign in
      </Button>
      {open && !user?.email ? <SignupModal open={open} onHide={setOpen} /> : null}
    </>
  );
}
