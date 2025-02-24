'use client'

import { useState } from 'react'

import Link from 'next/link'

import { GoogleIcon, LogoSvg } from './icons'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

export default function SignIn() {
  const [open, setOpen] = useState(false)
  const handleSignIn = () => {
    setOpen(true)
  }

  return (
    <>
      <Button className="rounded-full" onClick={handleSignIn}>
        Sign In
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[98%]! max-w-md! gap-8 md:w-full">
          <DialogHeader className="m-auto flex flex-col items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-700/30">
              <LogoSvg className="size-9 shrink-0" />
            </div>
            <DialogTitle className="text-2xl font-black">Subs Tracker</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="gap-3 rounded-full font-normal">
              <GoogleIcon /> Sign in with Google
            </Button>

            <p className="text-center text-xs leading-5">
              By clicking continue, you acknowledge that you have read and agree to{' '}
              <Link className="underline decoration-neutral-500 underline-offset-3" href={'/terms'}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link className="underline decoration-neutral-500 underline-offset-3" href={'privacy'}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
