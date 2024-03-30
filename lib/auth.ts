import { NextResponse } from 'next/server';

import { User } from '@supabase/supabase-js';

import { createClient } from './supabase/server';

export const checkAuth = async (callback: (user: User) => Promise<Response | undefined>) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { user } = data;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 });
  }

  if (user) {
    return callback(user);
  }
};
