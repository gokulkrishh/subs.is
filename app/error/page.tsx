import Link from 'next/link';

import { socialUrls } from 'config/urls';

export default async function Page() {
  return (
    <div className="flex flex-col justify-center mt-28 gap-2">
      <h2 className="font-medium text-lg">Error Occurred</h2>
      <p className="text-muted-foreground">
        An error occurred during the sign in, drop an email to
        <Link className="border-b hover:border-primary hover:text-primary" target="_blank" href={socialUrls.help}>
          {' '}
          support@subs.is
        </Link>{' '}
      </p>
    </div>
  );
}
