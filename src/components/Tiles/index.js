import React, { useState } from "react";

import "./styles.css";

export default function Tiles({ tileData, handleSelect }) {
  const [selectedTileId, setSelectedTileId] = useState(null);
  const tileLabels = Object.keys(tileData[0] ?? {}).filter(
    (label) => label !== "id"
  ); //key id is reserved for unique identification

  const handleTileClick = (tileId) => {
    setSelectedTileId(tileId);
    handleSelect(tileId);
  };

  return (
    <div className="tilesContainer">
      {tileData.map((info) => (
        <div
          key={info.id}
          className={`tile ${info.id === selectedTileId ? "selected" : ""}`}
          onClick={() => handleTileClick(info.id)}
        >
          {tileLabels.map((label) => (
            <li key={label}>
              {label}: <b>{info[label]}</b>
            </li>
          ))}
        </div>
      ))}
    </div>
  );
}
