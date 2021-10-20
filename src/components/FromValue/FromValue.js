import React from 'react';

export default function FromValue({ fromValue, handleFromValueChange, fromCurrency, setFromCurrency, optionsValues, optionsCurrencies }) {
    return (
        <div>
            <input type="number" value={fromValue || ''} onChange={handleFromValueChange} />
            <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                {optionsValues.map((option, val) => (
                    <option key={option} value={option}>{optionsCurrencies[val]}</option>
                ))}
            </select>
        </div>
    );
};
