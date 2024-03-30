'use client';

import React from 'react';

import { Button } from 'components/ui/button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (
    <div className="my-40 flex flex-col w-full md:max-w-lg m-auto bg-background text-primary">
      <h2 className="text-3xl font-bold capitalize">error occurred</h2>
      <p className="text-sm leading-6 mt-2">{error?.message.toString()}</p>
      <div className="mt-4">
        <Button variant={'outline'} onClick={() => reset()}>
          Retry
        </Button>
      </div>
    </div>
  );
}
