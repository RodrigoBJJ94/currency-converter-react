import React from 'react';

export default function ToValue({ toValue, handleToValueChange, toCurrency, setToCurrency, optionsValues, optionsCurrencies }) {
    return (
        <div>
            <input type="number" value={toValue || ''} onChange={handleToValueChange} />
            <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
                {optionsValues.map((option, val) => (
                    <option key={option} value={option}>{optionsCurrencies[val]}</option>
                ))}
            </select>
        </div>
    );
};
