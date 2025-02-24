'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  React.useEffect(() => {
    console.log('logging error:', error)
  }, [error])

  return (
    <div className="bg-background text-primary container m-auto my-40 flex w-full flex-col justify-center md:max-w-lg">
      <h2 className="text-3xl font-bold capitalize">Error occurred</h2>
      <p className="mt-2 text-sm leading-6">{error?.message.toString()}</p>
      <div className="mt-4">
        <Button variant="outline" onClick={() => reset()}>
          Retry
        </Button>
      </div>
    </div>
  )
}
