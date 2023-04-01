import express, { Express, NextFunction, Request, Response } from 'express'

const app: Express = express()
const port = process.env.PORT

const API_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

if (process.env.NODE_ENV !== 'production' && port === undefined) {
  console.error('Specify PORT environment variable `PORT=<XXXX> npm start`')
  process.exit(1)
}

const corsHeaders = (_: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', `Content-Type`);
  next()
}

app.use(corsHeaders)

app.get('/', (_: Request, res: Response) => {
  fetch(API_URL)
    .then(r => r.text())
    .then(txt => {
      res.setHeader('content-type', 'text/plain')
      res.send(txt)
    })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
