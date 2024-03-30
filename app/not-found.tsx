import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Subs Tracker | Not Found';
const description = 'Track and manage all your subscriptions from one app, without any hassle.';

export const metadata: Metadata = {
  title,
  description,
};

export default function NotFound() {
  return (
    <div className="my-40 flex flex-col w-full md:max-w-lg m-auto bg-background text-primary">
      <h2 className="text-3xl font-bold capitalize">404 - Not Found</h2>
      <p className="text-sm leading-6 mt-2">The page you are looking for doesn{"'"}t exit.</p>
      <div className="mt-4">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-3 gap-2"
          href={'/'}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
