import React from "react";

import "./styles.css";

export default function Loader({ theme = "blue" }) {
  return (
    <>
      <div className={`bouncingLoader ${theme}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
