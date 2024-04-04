import * as React from 'react';

import { SearchIcon } from 'components/icons';
import { cn } from 'lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="flex w-full items-center mb-6">
      <SearchIcon className="ml-3 h-4 w-4 absolute shrink-0 opacity-50" />
      <input
        type={type}
        className={cn(
          'flex w-full rounded-xl transition-all border border-input bg-background px-3 pl-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 h-12',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export { SearchInput };
