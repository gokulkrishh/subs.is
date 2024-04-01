import { useEffect, useState } from 'react';

import Image from 'next/image';

import { deleteSubscription, updateSubscription } from 'app/actions/subscriptions';
import { useUser } from 'components/context/user';
import Loader from 'components/loader';
import { Button } from 'components/ui/button';
import { Drawer, DrawerContent } from 'components/ui/drawer';
import { Input } from 'components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import { paymentCycle } from 'config/data';
import messages from 'config/messages';
import { calculateRenewalDate } from 'lib/data';
import { getCurrencySymbol } from 'lib/numbers';
import { cn, contrastColor, getFirstLetters, isValidUrl, randomColor } from 'lib/utils';
import { Bell, BellOff, Share, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Subscriptions } from 'types/data';

type CardDetailsProps = {
  subscription: Subscriptions;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CardDetails(props: CardDetailsProps) {
  const { open, setOpen, subscription } = props;
  const [loading, setLoading] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const share = async () => {
    const shareData = {
      text: `${getCurrencySymbol()} ${subscription} per ${subscription.payment_cycle}`,
      title: subscription.name,
      url: subscription.url || undefined,
    };
    await navigator?.share(shareData);
  };

  const onSubmit = async (subs: Subscriptions) => {
    try {
      setLoading(true);
      await updateSubscription({
        ...subs,
        renewal_date: calculateRenewalDate(subs.billing_date, subs.payment_cycle),
      });
      toast.success(messages.subscriptions.update.success);
    } catch (error: any) {
      toast.error(error.toString() || messages.subscriptions.update.error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="px-4 min-h-[500px] pb-6">
        <div className="flex relative flex-col mt-2 w-full md:max-w-sm mx-auto items-center gap-3">
          <div className="flex w-full gap-3 justify-end absolute -top-0.5">
            {typeof window !== 'undefined' && navigator && !!navigator?.share ? (
              <Button
                variant={'outline'}
                size={'icon'}
                onClick={async () => {
                  await share();
                }}
                className="h-9 w-9 rounded-full"
              >
                <Share className="h-4 w-4" />
              </Button>
            ) : null}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={async () => {
                      await notifyMe();
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
                      <Bell className="h-4 w-4" />
                    ) : (
                      <BellOff className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="mb-2 px-2">
                  {subscription.notify ? 'Disable email reminder' : 'Get email reminder 1 day before renewal.'}
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
              {deleteLoading ? <Loader className={'w-4 h-4 text-white'} /> : <Trash2Icon className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex flex-col w-full">
            <Form subscription={subscription} loading={loading} onSubmit={onSubmit} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type FormProps = {
  subscription: Subscriptions;
  loading: boolean;
  onSubmit: (subscription: any) => void;
};

function Form({ subscription, onSubmit, loading }: FormProps) {
  const [state, setState] = useState(subscription);
  const { user } = useUser();
  const randomHexColor = randomColor();

  useEffect(() => {
    setState(subscription);
  }, [subscription]);

  const isDisabled = Object.is(subscription, state);

  return (
    <form
      onSubmit={async (event: React.ChangeEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (state?.name?.length && state?.cost?.length && state?.billing_date?.length) {
          await onSubmit(state);
        }
      }}
      className="flex w-full mx-auto flex-col"
    >
      <h3 className="text-lg font-semibold mb-2">Edit Subscription</h3>
      <div className="flex flex-col my-2">
        <label
          inputMode="text"
          className="text-sm gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Name
        </label>
        <Input
          value={state.name}
          required
          placeholder="Netflix or Apple Music"
          className="mt-2.5 h-11 read-only:bg-accent/30"
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
          className="mt-2.5 h-11 read-only:bg-accent/30"
        />
      </div>
      <div className="grid grid-cols-[34%,37%,30%] gap-1 my-2">
        <div className="mr-3">
          <label className="text-sm inline-flex items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Cost <span className="ml-2 relative top-[1px]">{getCurrencySymbol(user?.currency_code)}</span>
          </label>
          <Input
            value={state.cost}
            required
            inputMode="decimal"
            type="number"
            placeholder="9.99"
            className="mt-2 h-11 read-only:bg-accent/30"
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
          </label>
          <Input
            value={state.billing_date}
            required
            max={new Date().toISOString().split('T')[0]}
            pattern={'d{2}-d{2}-d{4}'}
            type="date"
            placeholder="DD-MM-YYYY"
            className="mt-2 h-11 flex w-full appearance-none read-only:bg-accent/30"
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
            className="rounded-md disabled:bg-accent disabled:opacity-100 capitalize custom-select border border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2 h-11 flex w-full"
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
          className="flex w-full read-only:bg-accent/30 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-3 h-24"
          maxLength={60}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setState({ ...state, notes: e.target.value })}
        />
      </div>
      <Button disabled={loading || isDisabled} className="mt-3 md:mb-3 gap-2" type="submit">
        {loading ? <Loader className="w-4 h-4 !text-black" /> : null} Update
      </Button>
    </form>
  );
}
