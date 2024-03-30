import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { urls } from 'config/urls';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.set({ name, value: '', ...options });
            },
          },
        },
      );
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        throw new Error(error?.toString() || 'Error during code exchange');
      }
    } catch {
      return NextResponse.redirect(urls.error);
    } finally {
      return NextResponse.redirect(urls.home);
    }
  }
  return NextResponse.redirect(urls.error);
}
