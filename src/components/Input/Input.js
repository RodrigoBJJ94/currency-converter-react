import React from "react";
import "./Styles.css";

export default function Input({ initialPrice, setInicialPrice }) {
  return (
    <div className="inputContainer">
      <p className="inputText">
        Inform a value:
      </p>
      <input
        className="input"
        type="number"
        value={initialPrice}
        onChange={(element) => setInicialPrice(element.target.value)}
      />
    </div>
  );
};
