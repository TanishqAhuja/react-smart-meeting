import React, { useState } from "react";
import Loader from "../Loader";
import Card from "./card";

import "./styles.css";

export default function Cards({ cardsData = [] }) {
  // const [showDetails, setShowDetails] = useState(null);
  // const toggleDetails = () => {
  //   setShowDetails((prevValue) => !prevValue);
  // };
  return (
    <div className="cardsContainer">
      {cardsData.map((cardData, index) => {
        return <Card key={`${cardData.heading}${index}`} cardData={cardData} />;
      })}
    </div>
  );
}
