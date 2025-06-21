'use client';

import { useState } from 'react';

import { deleteSubscription, updateSubscription } from 'app/actions/subscriptions';
import { ActiveIcon, BellOffIcon, BellOnIcon, DeleteIcon, InActiveIcon, ShareIcon } from 'components/icons';
import Loader from 'components/loader';
import { Button } from 'components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import { paymentCycle } from 'config/data';
import messages from 'config/messages';
import { getCurrencySymbol } from 'lib/numbers';
import { cn } from 'lib/utils';
import { toast } from 'sonner';
import { Subscriptions, SubscriptionsUpdate } from 'types/data';

type CardActionsProps = {
  subscription: Subscriptions;
  setOpen: (open: boolean) => void;
};

// copy the actions in details and paste them here
export default function CardActions({ subscription, setOpen }: CardActionsProps) {
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [activeLoading, setActiveLoading] = useState(false);

  const share = async () => {
    const shareData = {
      text: `${subscription.name} costs ${getCurrencySymbol()} ${subscription.cost} ${subscription.payment_cycle}`,
      title: subscription.name,
      url: subscription.url || undefined,
    };
    await navigator?.share(shareData);
  };

  const notifyMe = async () => {
    try {
      setNotifyLoading(true);
      await updateSubscription({ notify: !subscription.notify, id: subscription.id });
      toast.success(messages.subscriptions.reminderSuccess(subscription.notify, subscription.name));
    } catch (error: any) {
      toast.error(error.toString() || messages.subscriptions.reminderError(subscription.notify));
    } finally {
      setNotifyLoading(false);
    }
  };

  const toggleActive = async () => {
    try {
      setActiveLoading(true);
      const payload = { active: !subscription.active, id: subscription.id, notify: false } as SubscriptionsUpdate;
      if (!subscription.active) {
        payload.billing_end_date = null;
      } else {
        payload.billing_end_date = new Date().toISOString().split('T')[0];
      }

      await updateSubscription(payload);
      toast.success(messages.subscriptions.active(subscription.notify, subscription.name));
    } catch (error: any) {
      toast.error(error.toString() || messages.subscriptions.activeError(subscription.notify));
    } finally {
      setActiveLoading(false);
    }
  };

  const onDelete = async (subs: Subscriptions) => {
    try {
      setDeleteLoading(true);
      await deleteSubscription(subs.id);
      toast.success(messages.subscriptions.delete.success);
    } catch (error: any) {
      toast.error(error.toString() || messages.subscriptions.delete.error);
    } finally {
      setDeleteLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="flex w-full gap-2 justify-end absolute -top-0.5">
      {typeof window !== 'undefined' && navigator && !!navigator?.share ? (
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={async (event) => {
            event.preventDefault();
            await share();
          }}
          className="h-9 w-9 rounded-full"
        >
          <ShareIcon className="h-4 w-4" />
        </Button>
      ) : null}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={'outline'}
              size={'icon'}
              onClick={async () => {
                if (subscription.active && subscription.payment_cycle !== paymentCycle.lifetime.key) {
                  await notifyMe();
                } else if (subscription.active && subscription.payment_cycle === paymentCycle.lifetime.key) {
                  toast.warning(messages.subscriptions.makeLifetimeError);
                } else {
                  toast.warning(messages.subscriptions.makeActiveError);
                }
              }}
              className={cn(`h-9 w-9 rounded-full text-primary transition-all`, {
                'bg-blue-600 !text-white border-blue-600 hover:bg-blue-700 active:bg-blue-700 hover:border-blue-700 active:border-blue-700':
                  subscription.notify,
              })}
            >
              {notifyLoading ? (
                <Loader
                  className={cn('w-4 h-4 text-primary', {
                    'text-white': subscription.notify,
                  })}
                />
              ) : subscription.notify ? (
                <BellOnIcon className="h-4 w-4" />
              ) : (
                <BellOffIcon className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-2 px-2">
            {subscription.notify ? 'Disable email reminder' : 'Get email reminder, one day before renewal.'}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={'outline'}
              size={'icon'}
              onClick={async () => {
                await toggleActive();
              }}
              className={cn(`h-9 w-9 rounded-full text-primary transition-all`, {
                'bg-blue-600 !text-white border-blue-600 hover:bg-blue-700 active:bg-blue-700 hover:border-blue-700 active:border-blue-700':
                  subscription.active,
              })}
            >
              {activeLoading ? (
                <Loader
                  className={cn('w-4 h-4 text-primary', {
                    'text-white': subscription.active,
                  })}
                />
              ) : !subscription.active ? (
                <InActiveIcon className="h-4 w-4 -ml-[1px]" />
              ) : (
                <ActiveIcon className="h-4 w-4 -ml-[1px]" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-2 px-2">
            {subscription.active ? 'Mark as in-active' : 'Mark as active'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        variant={'destructive'}
        size={'icon'}
        onClick={async () => {
          await onDelete(subscription);
        }}
        className="h-9 w-9 rounded-full"
      >
        {deleteLoading ? <Loader className={'w-4 h-4 text-white'} /> : <DeleteIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
