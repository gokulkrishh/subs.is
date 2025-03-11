import NumberFlow from '@number-flow/react'

type Props = {
  value: number
}

export default function AnimateNumber({ value }: Props) {
  return (
    <p className="flex items-center gap-1.5 text-5xl">
      <NumberFlow
        value={value}
        format={{ style: 'currency', currency: 'INR', trailingZeroDisplay: 'stripIfInteger' }}
        className="font-extrabold"
      />
    </p>
  )
}
