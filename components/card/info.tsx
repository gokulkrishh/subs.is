'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import { motion } from 'framer-motion';
import { formatDate, isWithInSevenDays } from 'lib/date';
import { getCurrencySymbol } from 'lib/numbers';
import { cn, contrastColor, getFirstLetters } from 'lib/utils';
import { Subscriptions, User } from 'types/data';

import CardDetails from './details';

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.05 },
  }),
};

type InfoProps = {
  subscription: Subscriptions;
  user: User | null;
};

// https://stackoverflow.com/a/33919020/266535
const blurDataURL = `data:image/gif;base64,R0lGODlhAQABAPAAABsbG////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default function CardInfo(props: InfoProps) {
  const { subscription, user } = props;
  const [open, setOpen] = useState(false);

  const isDue = isWithInSevenDays(subscription.renewal_date ?? '');

  return (
    <>
      <button
        suppressHydrationWarning
        key={subscription.id}
        onClick={() => {
          setOpen(!open);
        }}
        className={cn(
          `flex select-none shadow-sm items-center relative w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring justify-between p-3 px-4 rounded-xl border border-input`,
          {
            '!opacity-60': !subscription.active,
          },
        )}
        title={subscription.active ? 'Click to edit' : 'Subscription is in-active'}
      >
        <div className="flex gap-3">
          {subscription.url?.length ? (
            <Link
              className="hover:border-primary relative transition-all rounded-full border-2 border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={(event) => {
                event?.stopPropagation();
              }}
              href={subscription.url}
              target="_blank"
            >
              {subscription.notify ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="absolute inline-block -right-0 -top-0 rounded-full bg-blue-500 h-2 w-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Email reminder is enabled</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
              <Image
                placeholder="blur"
                blurDataURL={blurDataURL}
                loading="lazy"
                src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${subscription.url}&size=128`}
                alt={subscription.name}
                width={50}
                height={50}
                className={'rounded-full border border-input w-11 h-11'}
                style={{ maxWidth: '100%', objectFit: 'contain' }}
              />
            </Link>
          ) : (
            <div
              style={{
                backgroundColor: subscription?.color || `hsl(var(--accent))`,
                color: contrastColor(subscription?.color ?? 'hsl(var(--accent))'),
              }}
              className="rounded-full bg-accent font-medium text-lg flex items-center justify-center border border-input w-11 h-11"
            >
              {getFirstLetters(subscription.name)}
            </div>
          )}

          <div className="flex flex-col items-start justify-center">
            <h3 className="font-medium truncate max-w-[200px] sm:max-w-[300px] tracking-wide">{subscription.name}</h3>
            {subscription.active ? (
              <span
                title={`${isDue ? 'Due on ' : "Renew's at "}${formatDate(subscription?.renewal_date ?? '')}`}
                className={cn(`text-[13px] inline-flex items-center mt-0.5 text-muted-foreground`, {
                  'text-red-500': isDue,
                })}
              >
                {formatDate(subscription?.renewal_date ?? '')}
              </span>
            ) : (
              <span
                title={formatDate(subscription.billing_end_date ?? '')}
                className={cn(`text-[13px] inline-flex items-center mt-0.5 text-muted-foreground h-5`)}
              >
                Ended {formatDate(subscription.billing_end_date ?? '')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end w-fit">
          <p className="w-fit flex flex-col items-end">
            <span className="text-sm text-muted-foreground">
              {subscription.active ? subscription.payment_cycle : 'not active'}
            </span>
            <span className="inline-flex text-lg items-center">
              <span className="mr-0.5 font-sans">{getCurrencySymbol(user?.currency_code)}</span>
              <span className="font-semibold">{parseFloat(subscription.cost)}</span>
            </span>
          </p>
        </div>
      </button>
      {open ? <CardDetails open={open} setOpen={setOpen} subscription={subscription} /> : null}
    </>
  );
}
