'use client';

import { useEffect } from 'react';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

import { useUser } from './context/user';

type NumberProps = {
  from: number;
  to: number;
  duration?: number;
};

export function SummaryNumber({ from, to, duration = 0.2 }: NumberProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => latest.toFixed(2));

  useEffect(() => {
    animate(count, to, { duration });
  }, [duration, count, to]);

  return <motion.span className="font-black">{rounded}</motion.span>;
}
