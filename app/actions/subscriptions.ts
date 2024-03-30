'use server';

import { revalidateTag } from 'next/cache';

import messages from 'config/messages';
import demoSubscriptions from 'data/demo.json';
import { createClient } from 'lib/supabase/server';
import { Subscriptions, SubscriptionsInsert } from 'types/data';

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

export const createSubscription = async (subscription: SubscriptionsInsert) => {
  const user = await getAuthUser();
  if (!user) {
    throw new Error(messages.user.notAuth);
  }

  const supabase = await createClient();
  const { error } = await supabase.from('subscriptions').insert({ ...subscription, user_id: user.id });

  if (error) {
    throw new Error('Unable to create a new subscription.');
  }

  revalidateTag('supabase');
};

export const exportSubscriptions = async () => {
  const user = await getAuthUser();
  if (!user) {
    throw new Error(messages.user.notAuth);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`name,price,billing_date,renewal_date,url,notes,created_at`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<string>()
    .csv();
  if (error) {
    throw new Error(messages.export.error);
  }
  return data;
};
