'use client'

import { CurrencyComboBox } from '../ui/currency-combo'

export default function CurrencyCard() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-4">
      <h4 className="font-medium">Currency</h4>
      <CurrencyComboBox onSelect={() => {}} user={{ currency_code: 'INR' }} />
    </div>
  )
}
