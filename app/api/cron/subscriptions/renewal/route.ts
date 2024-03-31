import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { paymentCycle } from 'config/data';
import { calculatePrevRenewalDate, calculateRenewalDate } from 'lib/data';
import { verifyCronAuthorization } from 'lib/utils';
import { Subscriptions, User } from 'types/data';
import { Database } from 'types/supabase';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
);

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyCronAuthorization(request);
  if (!isAuthorized) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { data: users, error } = await supabaseAdmin.from('users').select('*').returns<User[]>();

    if (error) {
      return new Response('Unable to get users', { status: 500 });
    }

    if (users.length === 0) {
      return new Response('No users', { status: 404 });
    }

    const today = new Date();

    await Promise.allSettled(
      users?.map(async (user: User) => {
        const { data: subscriptions, error } = await supabaseAdmin
          .from('subscriptions')
          .select('user_id,id,name,billing_date,payment_cycle,renewal_date')
          .eq('user_id', user.id)
          .returns<Subscriptions[]>();

        const isBelowTodayDate = (subscription: Subscriptions) => {
          const renewal_date = new Date(
            subscription.renewal_date?.length ? subscription.renewal_date : subscription.billing_date,
          );
          return renewal_date < today;
        };

        const yearlySubscriptions = subscriptions
          ?.filter((sub) => sub.payment_cycle === paymentCycle.yearly.key)
          ?.filter(isBelowTodayDate) as Subscriptions[];

        const quarterlySubscriptions = subscriptions
          ?.filter((sub) => sub.payment_cycle === paymentCycle.quarterly.key)
          ?.filter(isBelowTodayDate) as Subscriptions[];

        const monthlySubscriptions = subscriptions
          ?.filter((sub) => sub.payment_cycle === paymentCycle.monthly.key)
          ?.filter(isBelowTodayDate) as Subscriptions[];

        if (error) {
          throw new Error(`Unable to get subscriptions: ${error.message}`);
        }

        const calculateSubsRenewalDate = (subscription: Subscriptions): Subscriptions => {
          const renewal_date = calculateRenewalDate(subscription.billing_date, subscription.payment_cycle);
          return { ...subscription, renewal_date };
        };

        const calculatedYearlyRenewalDate = yearlySubscriptions.map(calculateSubsRenewalDate);
        const calculatedMonthlySubscriptions = monthlySubscriptions.map(calculateSubsRenewalDate);
        const calculatedQuarterlySubscriptions = quarterlySubscriptions.map(calculateSubsRenewalDate);

        const updateSubsRenewalDate = [
          ...calculatedYearlyRenewalDate,
          ...calculatedQuarterlySubscriptions,
          ...calculatedMonthlySubscriptions,
        ];

        await Promise.allSettled(
          updateSubsRenewalDate.map(async (sub: Subscriptions) => {
            const { error } = await supabaseAdmin
              .from('subscriptions')
              .update({ renewal_date: sub.renewal_date })
              .eq('id', sub.id)
              .eq('user_id', user.id);

            if (error) {
              throw new Error(`Unable to update subscriptions renewal date: ${error.message}`);
            }
          }),
        );
      }),
    );

    return NextResponse.json({
      message: 'Renewal dates are updated successfully!',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
