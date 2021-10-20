import React, { useEffect, useState } from 'react';
import './Styles.css';
import Title from './components/Title/Title';
import FromValue from './components/FromValue/FromValue';
import ToValue from './components/ToValue/ToValue';
import ImageBackground from './components/Image/ImageBackground';

export default function App() {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [value, setValue] = useState(1);
  const [optionsValues, setOptionsValues] = useState([]);
  const [optionsCurrencies, setOptionsCurrencies] = useState([]);
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
    fetch(`https://api.frankfurter.app/latest?from=AUD`)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setOptionsValues([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.frankfurter.app/currencies`)
      .then(res => res.json())
      .then(data => {
        setOptionsCurrencies([...Object.values(data)])
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${fromCurrency}&to=${toCurrency}`)
        .then(resp => resp.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    };
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
    <div className="div-main">
      <Title />
      <FromValue
        fromValue={fromValue} handleFromValueChange={handleFromValueChange} fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency} optionsValues={optionsValues} optionsCurrencies={optionsCurrencies}
      />
      <ToValue
        toValue={toValue} handleToValueChange={handleToValueChange} toCurrency={toCurrency}
        setToCurrency={setToCurrency} optionsValues={optionsValues} optionsCurrencies={optionsCurrencies}
      />
      <ImageBackground />
    </div>
  );
};
