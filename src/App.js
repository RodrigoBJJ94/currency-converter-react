import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Title from "./components/Title/Title";
import Input from "./components/Input/Input";
import Selects from "./components/Selects/Selects";
import Result from "./components/Result/Result";
import Image from "./components/Image/Image";
import "./Styles.css";

export default function App() {
  const [initialPrice, setInicialPrice] = useState(1);
  const [initialCurrency, setInicialCurrency] = useState("USD");
  const [responsePrice, setResponsePrice] = useState();
  const [responseCurrency, setResponseCurrency] = useState("BRL");
  const [allCurrenciesSymbols, setAllCurrenciesSymbols] = useState();
  const [allCurrenciesNames, setAllCurrenciesNames] = useState();

  const APIBase = "https://api.frankfurter.app/";

  useEffect(() => {
    if (
      initialPrice !== ""
      && initialPrice !== "0"
      && initialCurrency !== responseCurrency
    ) {
      fetch(`${APIBase}latest?amount=${initialPrice}&from=${initialCurrency}&to=${responseCurrency}`)
        .then(res => res.json())
        .then(res => {
          setResponsePrice(Object.values(res.rates)[0]);
        });
    } else if (
      (initialPrice === "" || initialPrice === "0")
      && initialCurrency === responseCurrency
    ) {
      setResponsePrice("");
      Swal.fire("", "Please inform a value and different currencies!");
    } else if (initialPrice === "" || initialPrice === "0") {
      setResponsePrice("");
      Swal.fire("", "Please inform a value!");
    } else if (initialCurrency === responseCurrency) {
      setResponsePrice("");
      Swal.fire("", "Please inform different currencies!");
    };
  }, [initialPrice, initialCurrency, responseCurrency]);

  useEffect(() => {
    fetch(`${APIBase}currencies`)
      .then(res => res.json())
      .then(res => {
        setAllCurrenciesSymbols(Object.keys(res));
        setAllCurrenciesNames(Object.values(res));
      });
  }, []);

  return (
    <div className="containerApp">
      <div className="containerMain">
        {
          allCurrenciesSymbols !== undefined
            && allCurrenciesNames !== undefined
            ? <>
              <Title />
              <div className="containerData">
                <Input
                  initialPrice={initialPrice}
                  setInicialPrice={setInicialPrice}
                />
                <Selects
                  initialCurrency={initialCurrency}
                  setInicialCurrency={setInicialCurrency}
                  allCurrenciesSymbols={allCurrenciesSymbols}
                  allCurrenciesNames={allCurrenciesNames}
                  responseCurrency={responseCurrency}
                  setResponseCurrency={setResponseCurrency}
                />
                <Result
                  responsePrice={responsePrice}
                />
              </div>
              <Image />
            </>
            : null
        }
      </div>
    </div>
  );
};
