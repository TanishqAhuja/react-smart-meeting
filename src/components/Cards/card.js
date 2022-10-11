import React, { useState } from "react";
import Loader from "../Loader";

export default function Card({ cardData }) {
  const [showDetails, setShowDetails] = useState(null);
  const toggleDetails = () => {
    setShowDetails((prevValue) => !prevValue);
  };
  const shouldShowDetails = !!cardData.details && showDetails;

  return (
    <div
      className="card"
      onMouseEnter={toggleDetails}
      onMouseLeave={toggleDetails}
    >
      <h1 className="cardHeading">{cardData.heading}</h1>
      <div className="cardContent">
        {shouldShowDetails ? (
          <div className="cardDetails">{cardData.details}</div>
        ) : (
          cardData.content || <Loader theme="blue" />
        )}
      </div>
    </div>
  );
}
