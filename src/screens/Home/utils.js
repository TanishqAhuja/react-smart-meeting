import { getFormattedDate } from "../../utils";

export const isMeetingToday = (meetingDate) => {
  const currentDate = new Date();
  const currentFormattedDate = currentDate.toLocaleDateString();

  if (currentFormattedDate === meetingDate) {
    return true;
  }
  return false;
};

export const isMeetingOngoing = (meetingDetails) => {
  const { startTime, endTime, date } = meetingDetails;
  const formattedDate = getFormattedDate(date);
  const meetingStartTime = new Date(`${formattedDate} ${startTime}`);
  const meetingEndTime = new Date(`${formattedDate} ${endTime}`);
  const startTimeInMs = meetingStartTime.getTime();
  const endTimeInMs = meetingEndTime.getTime();

  const currentDate = new Date();
  const currentTimeInMs = currentDate.getTime();

  if (startTimeInMs <= currentTimeInMs && currentTimeInMs <= endTimeInMs) {
    return true;
  }
  return false;
};
