import { CurrencyExchange, CurrencyRate } from "./types"

/**
 * Parses currecy exchange API result into CurrencyExchange
 * @param text csv input string, sourcing from https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt
 */
export function parseCurrencyCSV(text: string): CurrencyExchange {
  const lines = text.trim().split("\n")
  const [dateWithId, thead, ...ratesLines] = lines
  // Extract date string
  const justDate = dateWithId.substring(0, dateWithId.indexOf('#') - 1)
  // Parse table columns
  const columns = thead.split("|")

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
    columns,
    rates,
  }
}


export const exchange = (fromAmount: number, toCurrencyAmount: number, toCurrencyRate: number) => fromAmount * (toCurrencyAmount / toCurrencyRate)

export function exchangeCZK(amountCZK: number, toCurrencyCode: string, rates: CurrencyRate[]): number | undefined {
  const rate = rates.find((r) => r.code === toCurrencyCode)

  if (rate !== undefined)
    return exchange(amountCZK, rate.amount, rate.rate)

  return undefined
}
