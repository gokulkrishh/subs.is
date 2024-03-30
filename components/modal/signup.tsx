'use client';

import { useState } from 'react';

import Link from 'next/link';

import { GoogleIcon, Icon } from 'components/icons';
import Loader from 'components/loader';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from 'components/ui/dialog';
import { urls } from 'config/urls';
import { createClient } from 'lib/supabase/client';
import { cn } from 'lib/utils';

import { useAuth } from '../context/auth';

type ButtonProps = {
  loading: boolean;
  onClick: () => void;
};

const Button = ({ loading, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        `items-center gap-2 mt-4 max-w-sm justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 hover:bg-primary/90 active:scale-[0.98] rounded-xl bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[40px] w-full`,
        {
          'bg-primary/80 cursor-default': loading,
        },
      )}
      onClick={onClick}
    >
      {loading ? <Loader className="text-white dark:text-black" /> : <GoogleIcon />}
      Continue with Google
    </button>
  );
};

type SignupModalProps = {
  open: boolean;
  onHide: (open: boolean) => void;
};

export default function SignupModal({ open, onHide }: SignupModalProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (user) return null;

  const onClick = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: urls.authCallback,
      },
    });

    setTimeout(() => {
      setLoading(false);
      onHide?.(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onHide}>
      <DialogContent className="max-w-sm w-[calc(100%-20px)] bg-background rounded-xl">
        <DialogHeader>
          <DialogTitle className="tracking-normal items-center flex-col justify-center flex">
            <div className="rounded-full bg-pink-100 dark:bg-pink-700/30 mb-2 w-14 h-14 flex items-center justify-center">
              <Icon className="text-pink-600 w-11 h-11 p-1" />
            </div>
            <div className="font-black flex items-center gap-2 text-pink-600 text-2xl tracking-tight">
              <span className="mt-0.5">Subs Tracker</span>
            </div>
            <DialogDescription className="mt-0.5 text-sm font-normal text-muted-foreground">
              Welcome back, Sign in below.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <Button loading={loading} onClick={onClick} />
        <p className="text-muted-foreground mt-1.5 text-xs max-w-sm w-full leading-5 text-left">
          By clicking continue, you acknowledge that you have read and agree to{' '}
          <Link
            className="underline hover:text-primary active:text-primary transition-colors"
            href={`${urls.home}/terms`}
          >
            Terms of Service
          </Link>{' '}
          &{' '}
          <Link
            className="underline hover:text-primary active:text-primary transition-colors"
            href={`${urls.home}/privacy`}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
