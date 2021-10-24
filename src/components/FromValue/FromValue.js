import React from 'react';
import './Styles.css';

export default function FromValue({ fromValue, fromCurrency, setFromCurrency, optionsValues, optionsCurrencies, setValue, setValueFromCurrency }) {
    const handleFromValueChange = (e) => {
        setValue(e.target.value);
        setValueFromCurrency(true);
    };

    return (
        <div className="from-value">
            <input type="number" value={fromValue || ''} onChange={handleFromValueChange} />
            <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
                {optionsValues.map((option, val) => (
                    <option key={option} value={option}>{optionsCurrencies[val]}</option>
                ))}
            </select>
        </div>
    );
};
