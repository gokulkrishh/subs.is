'use client';

import { useEffect } from 'react';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { getCurrencySymbol } from 'lib/numbers';

import { useUser } from './context/user';

type NumberProps = {
  from: number;
  to: number;
  duration?: number;
};

export function SummaryNumber({ from, to, duration = 0.2 }: NumberProps) {
  const { user } = useUser();
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => latest.toFixed(2));

  useEffect(() => {
    animate(count, to, { duration });
  }, [duration, count, to]);

  return (
    <div className="text-5xl mt-2">
      <span className="mr-1 font-sans font-bold">{getCurrencySymbol(user?.currency_code)}</span>
      <motion.span className="font-black">{rounded}</motion.span>
    </div>
  );
}
