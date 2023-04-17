import { useEffect, useState } from 'react'
import { exchangeCZK } from './lib'
import { useCurrencyRates } from './hooks'
import Container from './components/Layout/Container'
import Row from './components/Layout/Row'
import InputGroup from './components/Controls/InputGroup'
import InputLabel from './components/Controls/InputLabel'
import NumberInput from './components/Controls/NumberInput'
import Pick from './components/Controls/Pick'
import ExchangeResult from './components/ExchangeResult'
import CenteredAlert from './components/FullscreenOverlay'
import Heading from './components/Heading'
import ShowOn from './components/Layout/ShowOn'
import PlainTable from './components/PlainTable'
import TableRow from './components/TableRow'

function Exchange() {
  const { data, isLoading, isError, } = useCurrencyRates()

  const [amountCZK, setAmountCZK] = useState<number>(0)
  const [exchanged, setExchanged] = useState<number>(0)
  const [exchangeTo, setExchangeTo] = useState<string>('AUD')

  useEffect(() => {
    if (data) {
      const exchanged = exchangeCZK(amountCZK, exchangeTo, data.rates)
      setExchanged(exchanged!)
    }
  }, [amountCZK, exchangeTo, data])


  if (isLoading) {
    return <CenteredAlert title="Getting currency exchange data..." />
  }

  if (isError || data === undefined) {
    return <CenteredAlert title="Hmm... We are unable to get currency exchange data" />
  }

  const {
    columns,
    rates
  } = data!

  return (
    <Container>
      <Heading>Currency exchange</Heading>
      <ShowOn screens={['mobile']}>
        <ExchangeResult>
          {amountCZK} CZK &#8594; {exchanged.toFixed(3)} {exchangeTo}
        </ExchangeResult>
      </ShowOn>
      <form onSubmit={e => e.preventDefault()}>
        <Row>
          <InputGroup>
            <InputLabel htmlFor='input_czk'>CZK</InputLabel>
            <NumberInput id='input_czk' type='number' placeholder='CZK' value={amountCZK === 0 ? '' : amountCZK.toString()} onChange={e => setAmountCZK(Number(e.target.value))} />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor='ouput_currency'>TO</InputLabel>
            <Pick id='ouput_currency' value={exchangeTo} onChange={e => setExchangeTo(e.target.value)}>
              {rates.map(r =>
                <option value={r.code} key={r.code}>
                  {r.code} - {r.country}
                </option>
              )}
            </Pick>
          </InputGroup>
        </Row>
      </form>
      <ShowOn screens={['tablet']}>
        <ExchangeResult>
          {amountCZK} CZK &#8594; {exchanged.toFixed(3)} {exchangeTo}
        </ExchangeResult>
      </ShowOn>
      <PlainTable>
        <thead>
          <TableRow>
            {columns.map(th => <th key={th}>{th}</th>)}
          </TableRow>
        </thead>
        <tbody>
          {rates.map(r => <TableRow highlight={r.code === exchangeTo}>
            <td>{r.country}</td>
            <td>{r.currency}</td>
            <td>{r.amount}</td>
            <td>{r.code}</td>
            <td>{r.rate}</td>
          </TableRow>)}
        </tbody>
      </PlainTable>
    </Container>
  );
}

export default Exchange;
