'use server';

import { revalidateTag } from 'next/cache';

import { User as AuthUser } from '@supabase/supabase-js';
import { summaryFilter } from 'config/data';
import messages from 'config/messages';
import { createClient } from 'lib/supabase/server';
import { User } from 'types/data';

export const getAuthUser = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      throw new Error(error?.toString() || messages.user.fetchError);
    }
    const { user } = data;
    return user as AuthUser | null;
  } catch {
    return null;
  }
};

export const getUser = async () => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return null;
    }
    const supabase = await createClient();
    const { data } = await supabase.from('users').select('*').eq('id', user?.id).single();

    return data as User | null;
  } catch {
    return null;
  }
};

export const updateUserCurrency = async (currency_code: User['currency_code']) => {
  try {
    const userData = await getUser();
    if (!userData) {
      throw 'User not found';
    }
    const supabase = await createClient();
    const { error } = await supabase.from('users').update({ currency_code }).eq('id', userData.id);
    if (error) {
      throw new Error(error.toString() || messages.user.update.error);
    }
    revalidateTag('supabase');
  } catch (error) {
    throw new Error((error as Error).toString() || messages.user.update.error);
  }
};

export const updateSummaryFilter = async (filterKey: keyof typeof summaryFilter) => {
  const user = await getUser();
  if (!user) {
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase.from('users').update({ filter_by: filterKey }).eq('id', user.id);

  if (error) {
    throw new Error(messages.user.filter.error);
  }

  revalidateTag('supabase');
};
