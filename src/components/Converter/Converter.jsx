import React from "react";
import PropTypes from "prop-types";

import s from "./Converter.module.css";

export const Converter = (props) => {
  return (
    <div className={s.converter}>
      <input
        className={s.input}
        type="text"
        value={props.amount}
        onChange={(e) => props.onAmountChange(e.target.value)}
      />
      <select
        className={s.select}
        value={props.currency}
        onChange={(e) => props.onCurrencyChange(e.target.value)}
      >
        {props.currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

Converter.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};
