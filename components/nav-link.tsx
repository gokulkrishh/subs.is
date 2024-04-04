'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { useTheme } from 'next-themes';
import { useHotkeys } from 'react-hotkeys-hook';

type NavLinkProps = {
  children?: React.ReactNode;
  href: string;
  onClick?: (event: any) => void;
  className?: string;
  title: string;
  shortcut: string;
  Icon: React.ComponentType<{
    isActive?: boolean;
    className: string;
  }>;
};

export default function NavLink(props: NavLinkProps) {
  const { children, title, href, shortcut, className = '', Icon, ...otherProps } = props;
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme: theme } = useTheme();

  useHotkeys([shortcut], (_, handler) => {
    const keys = handler.keys?.join('');
    if (keys === shortcut) {
      router.push(href);
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            prefetch
            href={href}
            className={cn(
              `p-2.5 inline-block transition-all relative max-md:p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl group text-center text-primary/50 hover:text-primary`,
              className,
            )}
            {...otherProps}
          >
            {children ? children : <Icon className="w-6 h-6 text-primary" isActive={pathname === href} />}
            {pathname === href && (
              <motion.div
                layoutId={`nav-link`}
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                }}
                animate={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                }}
                transition={{ type: 'spring', duration: 0.25 }}
                className="rounded-full p-4 inset-0 absolute border border-input/50"
              />
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="top" className="mb-2 px-2">
          <kbd className="text-xs mr-1 bg-accent uppercase font-semibold border rounded-[6px] p-0.5 px-1.5">
            {shortcut}
          </kbd>{' '}
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
