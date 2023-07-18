import React from "react";
import "./Styles.css";

export default function Selects({
  initialCurrency, setInicialCurrency, allCurrenciesSymbols,
  allCurrenciesNames, responseCurrency, setResponseCurrency
}) {

  return (
    <div className="containerSelects">
      <select
        className="select"
        value={initialCurrency}
        onChange={element => setInicialCurrency(element.target.value)}>
        {
          allCurrenciesSymbols.map((data, id) => {
            return (
              <option
                key={id}
                value={data}>
                {allCurrenciesNames[id]}
              </option>
            );
          })
        }
      </select>
      <select
        className="select"
        value={responseCurrency}
        onChange={element => setResponseCurrency(element.target.value)}>
        {
          allCurrenciesSymbols.map((data, id) => {
            return (
              <option
                key={id}
                value={data}>
                {allCurrenciesNames[id]}
              </option>
            );
          })
        }
      </select>
    </div>
  );
};
