import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch'

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

function handler(req: VercelRequest, res: VercelResponse) {
  fetch(API_URL)
    .then(r => r.text())
    .then(txt => {
      res.setHeader('content-type', 'text/plain')
      res.send(txt)
    })
  // on error, just throw
}

export default handler