'use client';

import { useState } from 'react';

import Image from 'next/image';

import { createSubscription } from 'app/actions/subscriptions';
import Loader from 'components/loader';
import { Button } from 'components/ui/button';
import { Drawer, DrawerContent } from 'components/ui/drawer';
import { Input } from 'components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import { paymentCycle } from 'config/data';
import { calculatePrevRenewalDate, calculateRenewalDate } from 'lib/data';
import { getCurrencySymbol } from 'lib/numbers';
import { contrastColor, getFirstLetters, isValidUrl, randomColor } from 'lib/utils';
import { Plus } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';
import { SubscriptionsInsert, User } from 'types/data';

type AddProps = { user: User | undefined; showSignup: (show: boolean) => void };

export default function Add({ user, showSignup }: AddProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useHotkeys(['a'], (_, handler) => {
    const keys = handler.keys?.join('');
    if (keys === 'a') onClick();
  });

  const onClick = () => {
    if (!user?.email) {
      showSignup(true);
      return;
    } else {
      setOpen(true);
    }
  };

  const onSubmit = async (subscription: SubscriptionsInsert) => {
    try {
      setLoading(true);
      const renewal_date = calculateRenewalDate(subscription.billing_date, subscription.payment_cycle);
      const updatedSubscription = { ...subscription, renewal_date };
      await createSubscription(updatedSubscription);
      toast.success('Subscription is added successfully');
      setOpen(false);
    } catch (error) {
      toast.error(error?.toString() || 'Failed to add subscription');
    } finally {
      setLoading(false);
    }
  };

  const AddButton = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            className="rounded-full transition-colors p-2.5 md:p-2 bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring components/theme-toggle.tsx"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="mb-2 px-2">
          <kbd className="text-xs mr-1 border bg-accent uppercase font-semibold rounded-[6px] p-0.5 px-1.5">A</kbd> Add
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <AddButton />
      <DrawerContent className="px-4 pb-6">
        <Form loading={loading} onSubmit={onSubmit} user={user} />
      </DrawerContent>
    </Drawer>
  );
}

type FormProps = {
  user: User | undefined;
  loading: boolean;
  onSubmit: (subscription: SubscriptionsInsert) => void;
};

export function Form({ user, loading, onSubmit }: FormProps) {
  const randomHexColor = randomColor();
  const [state, setState] = useState<SubscriptionsInsert>({
    user_id: '',
    name: '',
    url: '',
    color: randomHexColor,
    cost: '',
    billing_date: new Date().toISOString().split('T')[0],
    payment_cycle: paymentCycle.monthly.key,
    notes: '',
  });

  const isDisabled = !state.name.length || !state.cost.length || !state.billing_date.length;

  return (
    <form
      onSubmit={async (event: React.ChangeEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (!isDisabled) {
          await onSubmit(state);
        }
      }}
      className={`flex w-full md:max-w-md mx-auto flex-col`}
    >
      <h3 className="text-lg font-semibold mb-2">Add Subscription</h3>
      <div className="flex flex-col my-2">
        <label
          inputMode="text"
          className="text-sm gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Name <span className="relative -top-0.5 text-xs text-red-500">*</span>
        </label>
        <Input
          value={state.name}
          required
          placeholder="Netflix or Apple Music"
          className="mt-2.5 h-11"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col my-2">
        <label className="text-sm flex items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          <span className="mr-2">Website</span>
          {isValidUrl(state?.url ?? '') && state.url?.length ? (
            <Image
              priority
              src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${state.url}&size=32`}
              alt={state.name}
              width={20}
              height={20}
              className={'rounded-full inline-flex border border-input'}
            />
          ) : (
            <div className="rounded-full relative overflow-hidden h-[20px] w-[20px] bg-accent font-medium text-4xl flex items-center justify-center border border-input">
              <input
                tabIndex={-1}
                type="color"
                className="h-[32px] w-[32px] m-[-50%]"
                value={state.color ?? randomHexColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setState({ ...state, color: e.target.value });
                }}
              />
              <span className={`absolute text-xs flex text-${contrastColor(state.color ?? randomHexColor)}`}>
                {getFirstLetters(state.name)}
              </span>
            </div>
          )}
        </label>
        <Input
          value={state?.url ?? ''}
          inputMode="url"
          type="url"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, url: e.target.value })}
          placeholder="https://netflix.com"
          className="mt-2.5 h-11"
        />
      </div>
      <div className="grid grid-cols-[34%,37%,30%] gap-1 my-2">
        <div className="mr-3">
          <label className="text-sm inline-flex items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Cost <span className="relative ml-1 mr-1 -top-0.5 text-xs text-red-500">*</span>{' '}
            {getCurrencySymbol(user?.currency_code)}
          </label>
          <Input
            value={state.cost}
            required
            inputMode="decimal"
            type="number"
            placeholder="9.99"
            className="mt-2 h-11"
            min="0"
            step="any"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setState({
                ...state,
                cost: parseFloat(e.target.value).toString(),
              })
            }
          />
        </div>
        <div className="mr-3">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Billing Date
            <span className="relative ml-1 -top-0.5 text-xs text-red-500">*</span>
          </label>
          <Input
            value={state.billing_date}
            required
            max={new Date().toISOString().split('T')[0]}
            pattern={'d{2}-d{2}-d{4}'}
            type="date"
            placeholder="DD-MM-YYYY"
            className="mt-2 h-11 flex w-full appearance-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState({ ...state, billing_date: e.target.value })}
          />
        </div>
        <div className="mr-3">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Cycle
          </label>
          <select
            value={state.payment_cycle ?? paymentCycle.monthly.key}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setState({ ...state, payment_cycle: e.target.value });
            }}
            className="rounded-md capitalize custom-select border border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mt-2 h-11 flex w-full"
          >
            {Object.values(paymentCycle).map(({ key }) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col my-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Notes{' '}
        </label>
        <textarea
          value={state.notes ?? ''}
          inputMode="text"
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-3 h-24"
          maxLength={60}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setState({ ...state, notes: e.target.value })}
        />
      </div>
      <Button disabled={loading || isDisabled} className="mt-3 md:mb-3 gap-2" type="submit">
        {loading ? <Loader className="w-4 h-4 !text-black" /> : null} Submit
      </Button>
    </form>
  );
}
