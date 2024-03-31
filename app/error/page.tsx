import Link from 'next/link';

import { socialUrls } from 'config/urls';

export default async function Page() {
  return (
    <div className="flex flex-col justify-center mt-28 gap-2">
      <h2 className="font-medium text-lg">Thank you for requesting early access.</h2>
      <p className="text-muted-foreground">
        We are currently in private beta, dm me in{' '}
        <Link className="border-b hover:border-primary hover:text-primary" target="_blank" href={socialUrls.twitter}>
          {' '}
          twitter
        </Link>{' '}
        to get access.
      </p>
    </div>
  );
}
