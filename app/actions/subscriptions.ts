'use server';

import { createClient } from 'lib/supabase/server';
import { Subscriptions } from 'types/data';

import { getAuthUser } from './user';

export const getSubscriptions = async () => {
  const user = await getAuthUser();
  if (!user) {
    return [];
  }
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('subscriptions')
    .select(`*`)
    .eq('user_id', user.id)
    .order('renewal_date', { ascending: true })
    .returns<Subscriptions[]>();

  if (error) {
    return [];
  }

  return data;
};
