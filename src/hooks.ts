import { useQuery } from "react-query";
import { parseCurrencyCSV } from "./lib";
import { CurrencyExchange } from "./types";

const EXCHANGE_API_URL = '/api/exchange'

export const useCurrencyRates = () => {
  return useQuery<CurrencyExchange, Error>("exchange", async () => await fetch(EXCHANGE_API_URL)
    .then(r => r.text())
    .then(parseCurrencyCSV))
};
