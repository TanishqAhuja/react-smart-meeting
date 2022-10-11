import React from "react";

export const BuildingsContext = React.createContext({
  buildings: [],
  setBuildings: () => {},
  meetings: [],
  setMeetings: () => {}
});
