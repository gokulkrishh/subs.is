'use client'

import { CurrencyComboBox } from '../ui/currency-combo'

export default function CurrencyCard() {
  return <CurrencyComboBox onSelect={() => {}} user={{ currency_code: 'INR' }} />
}
