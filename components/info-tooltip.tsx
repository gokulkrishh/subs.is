'use client';

import { useState } from 'react';

import { InfoIcon } from 'components/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import { cn } from 'lib/utils';

export default function InfoTooltip({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          className={cn(`cursor-pointer absolute top-0.5 -right-4 text-xs`, className)}
          onClick={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
        >
          <InfoIcon className="w-3 h-3 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-normal">
          Active subscriptions only
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  return null;
}
