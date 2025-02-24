export type Currency = {
  symbol: string
  name_plural: string
  code: string
  symbol_native: string
  decimal_digits: number
  name: string
  rounding: number
}

export type User = {
  currency_code: string
}
