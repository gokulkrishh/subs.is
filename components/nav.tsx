'use client'

import { useEffect } from 'react'

import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { parseAsString, useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type MenuItem = { name: string }

const menu: MenuItem[] = [
  { name: 'all' },
  { name: 'upcoming' },
  { name: 'weekly' },
  { name: 'monthly' },
  { name: 'yearly' },
  { name: 'quaterly' },
]

export default function NavFilter() {
  const { resolvedTheme: theme } = useTheme()
  const [filter, setFilter] = useQueryState('filter', parseAsString.withDefault(menu[1].name))

  useEffect(() => {
    const element = document.querySelector(`[data-id='${filter}']`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [filter])

  return (
    <div className="relative">
      <div className="relative flex gap-4 overflow-x-auto scroll-smooth pt-2 pr-8 pb-3 pl-4 whitespace-nowrap">
        {menu.map(({ name }) => (
          <Button
            className={cn(
              'relative min-w-14 shrink-0 cursor-pointer rounded-full text-sm capitalize transition-all duration-300 select-none active:scale-95',
              { 'font-semibold': filter === name },
            )}
            variant="secondary"
            key={name}
            onClick={() => setFilter(name)}
            asChild
          >
            <motion.button data-id={name}>
              {name}
              {filter === name && (
                <motion.div
                  layoutId="selected"
                  initial={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.1)',
                  }}
                  animate={{
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{ type: 'spring', duration: 0.3 }}
                  className="border-input/50 absolute top-0 left-0 h-full w-full rounded-full border"
                />
              )}
            </motion.button>
          </Button>
        ))}
      </div>
    </div>
  )
}
