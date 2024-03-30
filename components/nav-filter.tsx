'use client';

import { navFilter } from 'config/data';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { useTheme } from 'next-themes';

type NavFilterProps = {
  onChange: (key: keyof typeof navFilter) => void;
  selected: keyof typeof navFilter;
  count: number;
};

export default function NavFilter({ onChange, selected, count }: NavFilterProps) {
  const { resolvedTheme: theme } = useTheme();

  return (
    <div className="flex justify-between items-center">
      <h2 className="md:text-lg font-semibold">
        Subscriptions <span className="text-sm">({count})</span>
      </h2>
      <div className="flex border border-input bg-neutral-50 dark:bg-neutral-800/30 rounded-md">
        {Object.values(navFilter).map(({ key, label }, i) => (
          <motion.button
            onClick={() => {
              onChange(key);
            }}
            key={key}
            className={cn(
              `py-1.5 m-0.5 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring px-3 capitalize w-fit text-[13px] tracking-wide relative rounded-md`,
            )}
          >
            {label}
            {selected === key && (
              <motion.div
                layoutId="selected"
                initial={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                }}
                animate={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="absolute h-full border border-input/50 w-full rounded-sm top-0 left-0"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
