'use server';

import { User as AuthUser } from '@supabase/supabase-js';
import { createClient } from 'lib/supabase/server';
import { User } from 'types/data';

export const getAuthUser = async () => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error?.toString() || 'Error while fetching auth user');
    }
    const { user } = data;
    return user as AuthUser | null;
  } catch {
    return null;
  }
};

export const getUser = async () => {
  const supabase = await createClient();
  const user = await getAuthUser();
  if (!user) {
    return null;
  }
  try {
    const { data } = await supabase.from('users').select('*').eq('id', user?.id).single();
    return data as User | null;
  } catch {
    return null;
  }
};
