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
  rates: CurrencyRate[]
}

/**
 * Parses currecy exchange API result into CurrencyExchange
 * @param text csv input string, sourcing from https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
 */
export function parseCurrencyCSV(text: string): CurrencyExchange {
  const lines = text.split("\n")
  const [dateWithId, , ...ratesLines] = lines
  // Extract date string
  const justDate = dateWithId.substring(0, dateWithId.indexOf('#') - 1)

  // Parse currency lines into CurrencyRate[]
  const rates: CurrencyRate[] = ratesLines.map(l => {
    const [country, currency, amount, code, rate] = l.split("|")

    return {
      country,
      currency,
      amount: Number(amount),
      code,
      rate: Number(rate),
    }
  })

  return {
    date: justDate,
    rates,
  }
}


