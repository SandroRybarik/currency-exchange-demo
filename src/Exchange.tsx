import React, { useState } from 'react'
import './App.css'
import { exchangeCZK } from './lib'
import { useCurrencyRates } from './hooks';


function Exchange() {
  const { data, isLoading, isError } = useCurrencyRates()

  const [amountCZK, setAmountCZK] = useState<number>(0)
  const [exchanged, setExchanged] = useState<number>(0)
  const [exchangeTo, setExchangeTo] = useState<string>('AUD')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // called at render(), guaranteed that it is defined
    const guaranteedCurrencyRates = data!

    e.preventDefault()
    const exchanged = exchangeCZK(amountCZK, exchangeTo, guaranteedCurrencyRates.rates)
    setExchanged(exchanged!)
  }

  if (isError) {
    return <div>
      Cannot load data
    </div>
  }

  if (isLoading) {
    return <div>
      Waiting for data
    </div>
  }

  const {
    rates
  } = data!

  return (
    <div className="App">
      <h2>Currency exchange</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='number' placeholder='CZK' value={amountCZK} onChange={e => setAmountCZK(Number(e.target.value))} />
          <select value={exchangeTo} onChange={e => setExchangeTo(e.target.value)}>
            {rates.map(r =>
              <option value={r.code} key={r.code}>
                {r.code} - {r.country}
              </option>
            )}
          </select>
          <button>Submit</button>
        </div>
        <div>
          Exchanged: {exchanged.toFixed(3)}
        </div>
      </form>
    </div>
  );
}

export default Exchange;
