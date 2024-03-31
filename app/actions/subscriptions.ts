'use server';

import { revalidateTag } from 'next/cache';

import messages from 'config/messages';
import demoData from 'data/demo.json';
import { createClient } from 'lib/supabase/server';
import { Subscriptions, SubscriptionsInsert, SubscriptionsUpdate } from 'types/data';

import { getAuthUser } from './user';

export const getSubscriptions = async () => {
  const user = await getAuthUser();
  if (!user) {
    // Show demo data for when not logged in
    return demoData;
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
    .select(`name,cost,payment_cycle,renewal_date,billing_date,url,notes,active,notify,color,created_at,updated_at`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<string>()
    .csv();

  if (error) {
    throw new Error(messages.export.error);
  }
  return data;
};

export const updateSubscription = async (subscription: SubscriptionsUpdate) => {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('User is not authenticated.');
  }
  const supabase = await createClient();

  const { error } = await supabase
    .from('subscriptions')
    .update({ ...subscription })
    .eq('user_id', user.id)
    .eq('id', subscription.id);

  if (error) {
    throw new Error('Unable to update the subscription.');
  }

  revalidateTag('supabase');
};

export const deleteSubscription = async (id: Subscriptions['id']) => {
  const user = await getAuthUser();
  if (!user) {
    throw new Error('User is not authenticated.');
  }

  const supabase = await createClient();

  const { error } = await supabase.from('subscriptions').delete().eq('user_id', user.id).eq('id', id);

  if (error) {
    throw new Error('Unable to delete the subscription.');
  }

  revalidateTag('supabase');
};
