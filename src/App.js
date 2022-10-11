import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { BuildingsContext } from "./buildingsContext";
import AddMeeting from "./screens/AddMeeting";
import Home from "./screens/Home";

import "./styles.css";

export default function App() {
  const [buildings, setBuildings] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const updatedContext = {
    buildings,
    setBuildings,
    meetings,
    setMeetings
  };
  return (
    <Router>
      <BuildingsContext.Provider value={updatedContext}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/add-meeting" element={<AddMeeting />} />
          <Route path="*" element={<Link to="/home">Home</Link>} />
        </Routes>
      </BuildingsContext.Provider>
    </Router>
  );
}
