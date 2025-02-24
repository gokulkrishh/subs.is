import { useState } from 'react'

import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type MenuItem = { name: string }

const menu: MenuItem[] = [
  { name: 'upcoming' },
  { name: 'weekly' },
  { name: 'monthly' },
  { name: 'yearly' },
  { name: 'quaterly' },
  { name: 'all' },
]

export default function NavFilter() {
  const [selected, setSelected] = useState<MenuItem['name']>(menu[0].name)

  return (
    <div className="relative">
      <div className="relative flex gap-4 overflow-x-auto scroll-smooth pt-2 pr-8 pb-3 pl-4 whitespace-nowrap">
        {menu.map(({ name }) => (
          <Button
            className={cn(
              'relative min-w-14 shrink-0 cursor-pointer rounded-full text-sm capitalize transition-all select-none',
              {
                'font-bold': selected === name,
              },
            )}
            variant="secondary"
            key={name}
            onClick={() => setSelected(name)}
            asChild
          >
            <motion.button>
              {name}
              {selected === name && (
                <motion.div
                  layoutId="selected"
                  initial={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  animate={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{ type: 'spring', duration: 0.3 }}
                  className="border-input/50 absolute top-0 left-0 h-full w-full rounded-full border"
                />
              )}
            </motion.button>
          </Button>
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-14 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
