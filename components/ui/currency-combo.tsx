'use client'

import { useState } from 'react'

import currencyData from '@/data/currency.json'
import useMediaQuery from '@/hooks/useMediaQuery'
import { toast } from 'sonner'

import { Currency, User } from '@/app/types'

import { CheckIcon, DownArrowIcon } from '@/components/icons'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

import { DialogTitle } from './dialog'

const data = currencyData as { [key: string]: Currency }

type CurrencyComboBoxProps = {
  user: User | null
  onSelect: (currency: Currency['code']) => void
}

export function CurrencyComboBox({ user, onSelect }: CurrencyComboBoxProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Currency>(data[user?.currency_code ?? 'INR'])
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleSelect = async (value: Currency['code']) => {
    try {
      setLoading(true)
      setSelected(data[value])
      await onSelect(value)
      toast.success('Currency updated successfully')
    } catch (error) {
      toast.error(error?.toString())
    } finally {
      setLoading(false)
    }
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-fit justify-start gap-2 overflow-hidden px-3 text-sm font-normal text-ellipsis"
          >
            {loading ? <Loader className="h-4 w-4" /> : <DownArrowIcon className="h-4 w-4" />}
            {selected ? <>{selected.code}</> : <>Select currency</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0" align="start">
          <CountryList selected={selected.code} setOpen={setOpen} setSelected={handleSelect} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-fit justify-start gap-2 overflow-hidden px-3 text-sm font-normal text-ellipsis"
        >
          {loading ? <Loader className="h-4 w-4" /> : <DownArrowIcon className="h-4 w-4" />}
          {selected ? <>{selected.code}</> : <>Select currency</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogTitle className="sr-only">Select currency</DialogTitle>
        <div className="mt-4 border-t">
          <CountryList selected={selected.code} setOpen={setOpen} setSelected={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function CountryList({
  setOpen,
  selected,
  setSelected,
}: {
  setOpen: (open: boolean) => void
  selected: Currency['code']
  setSelected: (country: Currency['code']) => void
}) {
  return (
    <Command
      filter={(value: string, search: string) => {
        if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return 1
        return 0
      }}
    >
      <CommandInput placeholder="Search currency" />
      <CommandList className="w-full">
        <CommandEmpty>Not found</CommandEmpty>
        <CommandGroup>
          {Object.values(data).map((datum: Currency) => (
            <CommandItem
              className="!px-1 !py-3"
              key={datum.code}
              keywords={[datum.code, datum.name]}
              onSelect={() => {
                setSelected(datum.code as Currency['code'])
                setOpen(false)
              }}
            >
              <CheckIcon className={cn('mr-2 h-3.5 w-3.5', datum.code === selected ? 'opacity-100' : 'opacity-0')} />
              {datum.name} ({datum.code})
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
