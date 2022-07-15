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
    setAmountTo(format((amountFrom * data[currencyTo]) / data[currencyFrom]));
    setAmountFrom(amountFrom);
  }

  function handleCurrencyFromChange(currencyFrom) {
    setAmountTo(format((amountFrom * data[currencyTo]) / data[currencyFrom]));
    setCurrencyFrom(currencyFrom);
  }

  function handleAmountToChange(amountTo) {
    setAmountFrom(format((amountTo * data[currencyFrom]) / data[currencyTo]));
    setAmountTo(amountTo);
  }

  function handleCurrencyToChange(currencyTo) {
    setAmountFrom(format((amountTo * data[currencyFrom]) / data[currencyTo]));
    setCurrencyTo(currencyTo);
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <a className={s.logo} target="_blank" href="#" rel="noreferrer">
          Currency Converter
        </a>

        <ul>
          <li>USD: </li>
          <li>EUR: </li>
        </ul>

        <a
          className={s.dev}
          target="_blank"
          href="https://tvido.github.io/viter-cv/"
          rel="noreferrer"
        >
          CLICK ME
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
