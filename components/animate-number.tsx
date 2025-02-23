'use client'

import { useEffect } from 'react'

import { animate, motion, useMotionValue, useTransform } from 'motion/react'

type Props = {
  value: number
  unit: string
}

export default function AnimateNumber({ value, unit }: Props) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => latest.toFixed(2))

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.25 })
    return controls.stop
  }, [count, value])

  return (
    <p className="flex gap-1.5 text-5xl">
      <span className="font-semibold">{unit}</span>
      <motion.span className="font-black tabular-nums">{rounded}</motion.span>
    </p>
  )
}
