import React from "react";

import "./styles.css";

export default function CustomInput({ label, name, type, ...props }) {
  const isSelect = type === "select";
  return (
    <div className="inputContainer">
      <label>{label}:</label>
      {isSelect ? (
        <select name={name}>
          {props.options.map((option) => {
            const { value, displayText } = option;
            return (
              <option
                key={value}
                value={JSON.stringify({ id: value, name: displayText })}
              >
                {displayText}
              </option>
            );
          })}
        </select>
      ) : (
        <input type={type} name={name} {...props} />
      )}
    </div>
  );
}
