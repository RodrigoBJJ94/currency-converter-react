import React from "react";
import "./Styles.css";

export default function ToValue({ toValue, toCurrency, setToCurrency, optionsValues,
  optionsCurrencies, setValue, setValueFromCurrency }) {

  const handleToValueChange = (e) => {
    setValue(e.target.value);
    setValueFromCurrency(false);
  };

  return (
    <div className="container-value">
      <input
        type="number"
        value={toValue || ""}
        onChange={handleToValueChange}
      />
      <select
        value={toCurrency}
        onChange={e => setToCurrency(e.target.value)}>
        {optionsValues.map((option, val) => (
          <option
            key={option}
            value={option}>{optionsCurrencies[val]}
          </option>
        ))}
      </select>
    </div>
  );
};
