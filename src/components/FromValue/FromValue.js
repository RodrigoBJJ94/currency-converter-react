import React from "react";
import "../ToValue/Styles.css";

export default function FromValue({ fromValue, fromCurrency, setFromCurrency, optionsValues,
  optionsCurrencies, setValue, setValueFromCurrency }) {

  const handleFromValueChange = (e) => {
    setValue(e.target.value);
    setValueFromCurrency(true);
  };

  return (
    <div>
      <input
        type="number"
        value={fromValue || ""}
        onChange={handleFromValueChange}
      />
      <select
        value={fromCurrency}
        onChange={e => setFromCurrency(e.target.value)}>
        {optionsValues.map((option, val) => (
          <option
            key={option}
            value={option}>
            {optionsCurrencies[val]}
          </option>
        ))}
      </select>
    </div>
  );
};
