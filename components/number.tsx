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

export function Number({ from, to, duration = 0.2 }: NumberProps) {
  const { user } = useUser();
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => latest.toFixed(2));

  useEffect(() => {
    animate(count, to, { duration });
  }, [duration, count, to]);

  return (
    <>
      <span className="mr-1 font-sans">{getCurrencySymbol(user?.currency_code)}</span>
      <motion.span>{rounded}</motion.span>
    </>
  );
}
