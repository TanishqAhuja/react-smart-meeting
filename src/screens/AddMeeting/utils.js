export const getAvailableRooms = (
  allRooms,
  selectedDate,
  selectedStartTime
) => {
  if (allRooms.length) {
    return allRooms.filter((room) => {
      let isRoomAvailable = true;
      room.meetings.forEach((meeting) => {
        if (meeting.date === selectedDate) {
          if (
            meeting.startTime <= selectedStartTime &&
            selectedStartTime < meeting.endTime
          ) {
            isRoomAvailable = false;
          }
        }
      });
      return isRoomAvailable;
    });
  }
  return [];
};

export const getNextMeetingId = (allMeetings) => {
  let newMeetingId = allMeetings.reduce((acc, meeting) => {
    if (meeting.id > acc) {
      acc = meeting.id;
    }
    return acc;
  }, 0);
  return ++newMeetingId; //adding 1 to the highest id assigned
};

export const getBuildingOptions = (allBuildings) =>
  allBuildings.map((building) => ({
    value: building.id,
    displayText: building.name
  }));

export const getFormattedRoomsData = (availableRooms, selectedBuilding) =>
  availableRooms?.map((room) => ({
    "Room Name": room.name,
    "Floor Number": room.floor,
    "Building Name": selectedBuilding,
    id: room.id
  })) || [];

export const getAddMeetingQueryVariables = (formData, meetingId) => {
  const { title, date, startTime, endTime, roomId } = formData;
  const queryVariables = {
    id: meetingId,
    title,
    date,
    startTime,
    endTime,
    meetingRoomId: parseInt(roomId)
  };
  return queryVariables;
};
