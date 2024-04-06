import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { paymentCycle } from 'config/data';
import { email } from 'config/urls';
import { format, isToday, sub } from 'date-fns';
import ReminderEmail from 'emails/reminder';
import { calculateRenewalDate } from 'lib/data';
import { formatNumber } from 'lib/numbers';
import { verifyCronAuthorization } from 'lib/utils';
import { Resend } from 'resend';
import { Subscriptions, User } from 'types/data';
import { Database } from 'types/supabase';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

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
    const formattedToday = format(today, 'yyyy-MM-dd');

    // To send email reminders to users for their subscriptions renewal
    await Promise.allSettled(
      users?.map(async (user: User) => {
        const { data: subscriptions, error } = await supabaseAdmin
          .from('subscriptions')
          .select('user_id,id,name,cost,billing_date,payment_cycle,renewal_date')
          .eq('user_id', user.id)
          .eq('notify', true)
          .returns<Subscriptions[]>();

        const isRenewalToday = (subscription: Subscriptions) => {
          const renewal_date = new Date(subscription.renewal_date ?? '');
          return isToday(sub(renewal_date, { days: 1 }));
        };

        const yearlySubscriptions = subscriptions
          ?.filter((sub) => sub.payment_cycle === paymentCycle.yearly.key)
          ?.filter(isRenewalToday) as Subscriptions[];

        const quarterlySubscriptions = subscriptions
          ?.filter((sub) => sub.payment_cycle === paymentCycle.quarterly.key)
          ?.filter(isRenewalToday) as Subscriptions[];

        const monthlySubscriptions = subscriptions
          ?.filter((sub) => sub.payment_cycle === paymentCycle.monthly.key)
          ?.filter(isRenewalToday) as Subscriptions[];

        if (error) {
          throw new Error(`Unable to get subscriptions for email reminder: ${error.message}`);
        }

        const subscriptionsRenewals = [...monthlySubscriptions, ...quarterlySubscriptions, ...yearlySubscriptions];

        await Promise.allSettled(
          subscriptionsRenewals.map(async (sub: Subscriptions) => {
            const { name, renewal_date, cost } = sub;
            try {
              await resend.emails.send({
                from: email.from,
                to: user.email,
                subject: `Reminder: ${name} subscription will renew soon`,
                react: ReminderEmail({
                  name,
                  cost: `${formatNumber({
                    value: Number(parseFloat(cost).toFixed(2)),
                    currency: user.currency_code,
                  })}`,
                  fullName: user.full_name,
                  date: format(new Date(renewal_date ?? ''), 'dd MMM yyyy'),
                }),
              });
            } catch (error: any) {
              console.log('Error sending email reminder', error?.toString());
            }
          }),
        );
      }),
    );

    // To update the renewal date of the subscriptions for each user on the day of renewal
    await Promise.allSettled(
      users?.map(async (user: User) => {
        const { data: subscriptions, error } = await supabaseAdmin
          .from('subscriptions')
          .select('user_id,id,name,billing_date,payment_cycle,renewal_date')
          .eq('user_id', user.id)
          .returns<Subscriptions[]>();

        const isBelowTodayDate = (subscription: Subscriptions) => {
          const renewal_date = new Date(subscription.renewal_date ?? subscription.billing_date);
          return format(renewal_date, 'yyyy-MM-dd') < formattedToday;
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

        const calculatedMonthlySubscriptions = monthlySubscriptions.map(calculateSubsRenewalDate);
        const calculatedQuarterlySubscriptions = quarterlySubscriptions.map(calculateSubsRenewalDate);
        const calculatedYearlyRenewalDate = yearlySubscriptions.map(calculateSubsRenewalDate);

        const updateSubsRenewalDate = [
          ...calculatedMonthlySubscriptions,
          ...calculatedQuarterlySubscriptions,
          ...calculatedYearlyRenewalDate,
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

    return NextResponse.json('Done');
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
