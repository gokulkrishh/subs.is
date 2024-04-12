'use client';

import { useState } from 'react';

import { SummaryNumber } from 'components/summary-number';
import { getCurrencySymbol } from 'lib/numbers';
import { Subscriptions, User } from 'types/data';

import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type SummaryProps = {
  subscriptions: Subscriptions[];
  user: User | null;
  includeInActive: boolean;
  setIncludeInactive: (value: boolean) => void;
};

export default function Summary({ subscriptions, user, setIncludeInactive, includeInActive }: SummaryProps) {
  const [open, setOpen] = useState(false);
  const totalCost = subscriptions.reduce((acc, curr) => acc + parseFloat(curr.cost), 0);

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-lg tracking-wide flex items-center gap-1">Total cost for subscriptions</h2>
      <div className="text-5xl mt-2">
        <span className="mr-1 font-sans font-bold">{getCurrencySymbol(user?.currency_code)}</span>
        <SummaryNumber from={totalCost} to={totalCost} />
        <div className="text-xs flex items-center gap-2 mt-2">
          <TooltipProvider>
            <Tooltip open={open} onOpenChange={setOpen}>
              <TooltipTrigger
                onClick={() => {
                  setOpen(true);
                }}
                onBlur={() => {
                  setOpen(false);
                }}
                asChild
              >
                <Switch
                  thumbClassName="w-3 h-3 data-[state=checked]:translate-x-3"
                  className="h-4 w-7 aria-[checked=true]:bg-primary aria-[checked=false]:bg-input"
                  checked={includeInActive}
                  onCheckedChange={setIncludeInactive}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="mt-2 px-2">
                {includeInActive ? 'Showing in-active subscriptions' : 'Click to show in-active subscriptions'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
