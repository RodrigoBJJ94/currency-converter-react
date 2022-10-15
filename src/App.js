import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Title from "./components/Title/Title";
import FromValue from "./components/FromValue/FromValue";
import ToValue from "./components/ToValue/ToValue";
import ImageBackground from "./components/Image/ImageBackground";
import "./Styles.css";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [value, setValue] = useState(1);
  const [optionsValues, setOptionsValues] = useState([]);
  const [optionsCurrencies, setOptionsCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [valueFromCurrency, setValueFromCurrency] = useState(true);

  const APIBase = "https://api.frankfurter.app/";

  let toValue, fromValue;

  if (valueFromCurrency) {
    fromValue = value;
    toValue = value * exchangeRate;
  } else {
    toValue = value;
    fromValue = value / exchangeRate;
  };

  useEffect(() => {
    fetch(`${APIBase}latest?from=AUD`)
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
    fetch(`${APIBase}currencies`)
      .then(res => res.json())
      .then(data => {
        setOptionsCurrencies([...Object.values(data)])
      });
  }, []);

  useEffect(() => {
    if ((fromCurrency != null && toCurrency != null)
      && (fromCurrency != toCurrency)) {
      fetch(`${APIBase}latest?amount=${value}&from=${fromCurrency}&to=${toCurrency}`)
        .then(resp => resp.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    } else if ((fromCurrency === toCurrency)
      && (fromCurrency != null) &&
      (toCurrency != null)) {
      swal("", "Please choose two different currencies!", "error");
    };
  }, [fromCurrency, toCurrency]);

  return (
    <div className="div-main">
      <Title />
      <div>
        <FromValue
          fromValue={fromValue}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          optionsValues={optionsValues}
          optionsCurrencies={optionsCurrencies}
          setValue={setValue}
          setValueFromCurrency={setFromCurrency}
        />
        <ToValue
          toValue={toValue}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
          optionsValues={optionsValues}
          optionsCurrencies={optionsCurrencies}
          setValue={setValue}
          setValueFromCurrency={setValueFromCurrency}
        />
      </div>
      <ImageBackground />
    </div>
  );
};
