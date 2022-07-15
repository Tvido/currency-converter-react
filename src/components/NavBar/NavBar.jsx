import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import s from "./NavBar.module.css";

import { Converter } from "../Converter/Converter";

export const NavBar = () => {
  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(1);

  const [currencyFrom, setCurrencyFrom] = useState("UAH");
  const [currencyTo, setCurrencyTo] = useState("USD");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://cdn.cur.su/api/latest.json").then((response) => {
      setData(response.data.rates);
    });
  }, []);

  useEffect(() => {
    if (!data) {
      function init() {
        handleAmountFromChange(1);
      }
      init();
    }
  }, [data]);

  function format(number) {
    return number.toFixed(3);
  }

  function handleAmountFromChange(amountFrom) {
    setAmountTo((amountFrom * data[currencyTo]) / data[currencyFrom]);
    setAmountFrom(amountFrom);
  }

  function handleCurrencyFromChange(currencyFrom) {
    setAmountTo((amountFrom * data[currencyTo]) / data[currencyFrom]);
    setCurrencyFrom(currencyFrom);
  }

  function handleAmountToChange(amountTo) {
    setAmountFrom((amountTo * data[currencyFrom]) / data[currencyTo]);
    setAmountTo(amountTo);
  }

  function handleCurrencyToChange(currencyTo) {
    setAmountFrom((amountTo * data[currencyFrom]) / data[currencyTo]);
    setCurrencyTo(currencyTo);
  }

  function getCurrentCurrency(currency) {
    return data ? (data["UAH"] * data[currency]).toFixed(2) : 0;
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <a className={s.logo} target="_blank" href="/" rel="noreferrer">
          Currency Converter
        </a>

        <ul>
          <li>USD: {getCurrentCurrency("USD")} грн</li>
          <li>EUR: {getCurrentCurrency("EUR")} грн</li>
        </ul>

        <a
          className={s.dev}
          target="_blank"
          href="https://tvido.github.io/viter-cv/"
          rel="noreferrer"
        >
          Click me
        </a>
      </header>

      <div className={s.content}>
        <Converter
          onAmountChange={handleAmountFromChange}
          onCurrencyChange={handleCurrencyFromChange}
          currencies={Object.keys(data)}
          amount={amountFrom}
          currency={currencyFrom}
        />

        <Converter
          onAmountChange={handleAmountToChange}
          onCurrencyChange={handleCurrencyToChange}
          currencies={Object.keys(data)}
          amount={amountTo}
          currency={currencyTo}
        />
      </div>
    </div>
  );
};
