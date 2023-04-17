export interface CurrencyRate {
  // Country|Currency|Amount|Code|Rate
  country: string
  currency: string
  amount: number
  code: string
  rate: number
}

export interface CurrencyExchange {
  date: string // date is already in human readable format
  columns: string[], // csv columns
  rates: CurrencyRate[]
}
