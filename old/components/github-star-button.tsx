'use server';

import Link from 'next/link';

import { socialUrls } from 'config/urls';

import { StarIcon } from './icons';

const owner: string = 'gokulkrishh';
const repo: string = 'subs.is';

async function getStarCount(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { next: { revalidate: 1200 } }, // 20 minutes
    );
    const data = await response.json();
    if (response.ok) {
      return data.stargazers_count;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error:', error);
    return 0;
  }
}

export default async function GithubStarButton() {
  const count = await getStarCount();
  return (
    <Link
      target="_blank"
      href={socialUrls.github}
      className="tabular-nums gap-1.5 max-sm:hidden inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground py-2 h-8 text-xs px-2 tracking-wide rounded-md"
    >
      <StarIcon className="text-primary w-3 h-3" /> <span className="mt-[2px]">{count}</span>
    </Link>
  );
}
