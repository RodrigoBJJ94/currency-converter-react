import React from "react";
import "./Styles.css";

export default function Result({ responsePrice }) {
  return (
    <div className="resultMainContainer">
      <p className="resultText">
        Result:
      </p>
      <div className="resultContainer">
        <h1 className="result">
          {responsePrice}
        </h1>
      </div>
    </div>
  );
};
