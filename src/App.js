import React, { useEffect, useState } from 'react';

export default function App() {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [value, setValue] = useState(1);
  const [options, setOptions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [valueFromCurrency, setValueFromCurrency] = useState(true);

  let toValue, fromValue;

  if (valueFromCurrency) {
    fromValue = value;
    toValue = value * exchangeRate;
  } else {
    toValue = value;
    fromValue = value / exchangeRate;
  };

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest`)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${fromCurrency}&to=${toCurrency}`)
        .then(resp => resp.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]);

  const handleFromValueChange = (e) => {
    setValue(e.target.value);
    setValueFromCurrency(true);
  };

  const handleToValueChange = (e) => {
    setValue(e.target.value);
    setValueFromCurrency(false);
  };

  return (
    <>
      <h1>Currency Converter</h1>
      <div>
        <input type="number" value={fromValue || ''} onChange={handleFromValueChange} className="input" />
        <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
            ))}
        </select>
      </div>
      <div>
        <input type="number" value={toValue || ''} onChange={handleToValueChange} className="input" />
        <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </>
  );
};
