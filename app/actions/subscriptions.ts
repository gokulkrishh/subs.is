'use server';

import { revalidateTag } from 'next/cache';

import messages from 'config/messages';
import { calculatePrevRenewalDate, calculateRenewalDate } from 'lib/data';
import { createClient } from 'lib/supabase/server';
import { Subscriptions, SubscriptionsInsert, SubscriptionsModified, SubscriptionsUpdate } from 'types/data';

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
    .returns<Subscriptions[]>();

  if (error) {
    return [];
  }

  return data.map((sub) => {
    const renewal_date = calculateRenewalDate(sub.billing_date, sub.payment_cycle);
    const prev_renewal_date = calculatePrevRenewalDate(sub.billing_date, renewal_date, sub.payment_cycle);
    return { ...sub, renewal_date, prev_renewal_date };
  }) as SubscriptionsModified[];
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
    .select(`name,cost,billing_date,url,notes,created_at`)
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
