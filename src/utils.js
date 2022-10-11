export const getFormattedDate = (date) => {
  const dateArray = date.split("/");
  const temp = dateArray[0];
  dateArray[0] = dateArray[1];
  dateArray[1] = temp;
  const formattedDate = dateArray.join("/");
  return formattedDate;
};
