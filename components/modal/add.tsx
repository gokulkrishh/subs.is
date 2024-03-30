'use client';

import { useState } from 'react';

import { createSubscription } from 'app/actions/subscriptions';
import { Drawer, DrawerContent } from 'components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
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
      await createSubscription({ ...subscription });
      toast.success('Subscription is added successfully');
      setOpen(false);
    } catch (error) {
      toast.error(error?.toString() || 'Failed to add subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
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
            <kbd className="text-xs mr-1 border bg-accent uppercase font-semibold rounded-[6px] p-0.5 px-1.5">A</kbd>{' '}
            Add
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DrawerContent className="px-4 pb-6">test</DrawerContent>
    </Drawer>
  );
}
