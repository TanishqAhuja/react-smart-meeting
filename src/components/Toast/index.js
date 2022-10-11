import React from "react";

import "./styles.css";

export default function Toast({ type, hideToast }) {
  return (
    <div className={`toast ${type}`}>
      {toastMessages[type]}
      <button> ✕ </button>
    </div>
  );
}

const toastMessages = {
  success: "meeting added successfully!!"
};
