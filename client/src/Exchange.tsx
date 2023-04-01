import { useEffect, useState } from 'react'
import { exchangeCZK } from './lib'
import { useCurrencyRates } from './hooks';
import {
  CenteredAlert,
  Container,
  ExchangeResult,
  FullScreenOverlay,
  Heading,
  InputGroup,
  InputLabel,
  NumberInput,
  Pick,
  PlainTable,
  Row,
  ShowOn,
  TableRow
} from './components';


function Exchange() {
  const { data, isLoading, isError,  } = useCurrencyRates()

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
    return <FullScreenOverlay>
      <CenteredAlert title="Getting currency exchange data..." />
    </FullScreenOverlay>
  }

  if (isError || data === undefined) {
    return <FullScreenOverlay>
      <CenteredAlert title="Hmm... We are unable to get currency exchange data" />
    </FullScreenOverlay>
  }

  const {
    rates
  } = data!

  console.log('HEY', rates)

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
            {['Country', 'Currency', 'Amount', 'Code', 'Rate'].map(th => <th key={th}>{th}</th>)}
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
