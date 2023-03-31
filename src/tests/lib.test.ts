import { parseCurrencyCSV } from "../lib"

const csvMockValue = `
29 Mar 2023 #63
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.540
Brazil|real|1|BRL|4.223
Bulgaria|lev|1|BGN|12.082
Canada|dollar|1|CAD|16.034
China|renminbi|1|CNY|3.165
Denmark|krone|1|DKK|3.172
EMU|euro|1|EUR|23.630
Hongkong|dollar|1|HKD|2.775
`.trim()

const parsedByHand = [
  {
    country: 'Australia',
    currency: 'dollar',
    amount: 1,
    code: 'AUD',
    rate: 14.540,
  },
  {
    country: 'Denmark',
    currency: 'krone',
    amount: 1,
    code: 'DKK',
    rate: 3.172,
  },
  {
    country: 'Hongkong',
    currency: 'dollar',
    amount: 1,
    code: 'HKD',
    rate: 2.775, 
  },
]

test('parsing api csv like data', () => {
  const parse = parseCurrencyCSV(csvMockValue)
  // expect(parse).toBe({})
  expect(parse.date).toBe('29 Mar 2023')
  expect(parse.rates[0]).toStrictEqual(parsedByHand[0])
  expect(parse.rates[5]).toStrictEqual(parsedByHand[1])
  expect(parse.rates[7]).toStrictEqual(parsedByHand[2])
})
