import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUsingGQL from "../../graphQL/useGraphQL";
import {
  getBuildingsQuery,
  getMeetingRoomsQuery,
  getMeetingsQuery
} from "../../graphQL/queries";
import { BuildingsContext } from "../../buildingsContext";
import { isMeetingOngoing, isMeetingToday } from "./utils";
import Cards from "../../components/Cards";
import Toast from "../../components/Toast";

import "./styles.css";

export default function Home() {
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const { buildings, setBuildings, meetings, setMeetings } = useContext(
    BuildingsContext
  );

  const fetchData = useCallback(() => {
    fetchUsingGQL(getBuildingsQuery).then((response) =>
      setBuildings(response.Buildings)
    );
    fetchUsingGQL(getMeetingRoomsQuery).then((response) =>
      setMeetingRooms(response.MeetingRooms)
    );
    fetchUsingGQL(getMeetingsQuery).then((response) =>
      setMeetings(response.Meetings)
    );
  }, [setBuildings, setMeetings]);

  useEffect(() => {
    fetchData();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("showToast") === "true") {
      setShowToast(true);
    }
  }, [fetchData]);

  useEffect(() => {
    const toastTimeout = setTimeout(() => setShowToast(false), 5000);
    return () => {
      clearTimeout(toastTimeout);
    };
  }, [showToast]);

  const hideToast = () => setShowToast(false);

  const getRoomDetails = () => {
    let availableRooms = 0;
    meetingRooms.forEach((room) => {
      let isRoomAvailable = true;
      room.meetings.forEach((meeting) => {
        isRoomAvailable = !isMeetingOngoing(meeting);
      });
      if (isRoomAvailable) ++availableRooms;
    });
    return (
      <>
        <li>Total Rooms: {meetingRooms?.length}</li>
        <li>Rooms Occupied: {meetingRooms?.length - availableRooms}</li>
        <li>Rooms Available: {availableRooms}</li>
      </>
    );
  };

  const getMeetingDetails = () => {
    let onGoingMeetings = 0;
    let meetingsToday = 0;
    meetings.forEach((meeting) => {
      const { date } = meeting;
      if (isMeetingToday(date)) {
        ++meetingsToday;
        if (isMeetingOngoing(meeting)) {
          ++onGoingMeetings;
        }
      }
    });
    return (
      <>
        <li>Total Meetings: {meetings?.length}</li>
        <li>Meetings Today: {meetingsToday}</li>
        <li>Meetings Ongoing: {onGoingMeetings}</li>
      </>
    );
  };

  const displayData = [
    {
      heading: "Buildings",
      content: buildings?.length,
      details: null
    },
    {
      heading: "Rooms",
      content: meetingRooms?.length,
      details: getRoomDetails()
    },
    {
      heading: "Meetings",
      content: meetings?.length,
      details: getMeetingDetails()
    }
  ];

  return (
    <>
      {showToast ? <Toast type="success" hideToast={hideToast} /> : null}
      <div className="homeContainer">
        <Cards cardsData={displayData} />
        <Link to="/add-meeting">
          <button className="addMeetingBtn">Add Meeting</button>
        </Link>
      </div>
    </>
  );
}
