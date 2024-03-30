import { cookies } from 'next/headers';

import { type CookieOptions, createServerClient } from '@supabase/ssr';

import { createFetch } from './cache';

export const createClient = (cacheTags: string[] = ['supabase'], forceCache: boolean = false) => {
  const cookieStore: ReturnType<typeof cookies> = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
    global: {
      fetch: createFetch({
        cache: forceCache ? 'force-cache' : 'default',
        next: { tags: [...cacheTags] },
      }),
    },
  });
};
