'use client';

import { useEffect } from 'react';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

type NumberProps = {
  from: number;
  to: number;
  duration?: number;
};

export function SummaryNumber({ from, to, duration = 0.25 }: NumberProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => latest.toFixed(2));

  useEffect(() => {
    const controls = animate(count, to, { duration });
    return () => controls.stop();
  }, [duration, count, to]);

  return <motion.span className="font-black tabular-nums">{rounded}</motion.span>;
}
