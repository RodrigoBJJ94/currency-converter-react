import React from "react";
import "./Styles.css";

export default function Result({ responsePrice }) {
  return (
    <div className="answer-main-container">
      <p className="answer-text">
        Result:
      </p>
      <div className="answer-container">
        <h1 className="answer">{responsePrice}</h1>
      </div>
    </div>
  );
};
