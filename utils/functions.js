export const displayDate = (createdAt) => {
  const date = new Date(createdAt);

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC", // Adjust to UTC or the desired timezone
  });

  return formattedDate;
};
