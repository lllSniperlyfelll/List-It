function getMonthName(monthNumber) {
  const months = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthNumber];
}

function getDayName(dayNumber) {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return days[dayNumber];
}

export const getFormattedDate = (date) => {
  //const dayName = getDayName(date.getDay());
  const monthName = getMonthName(date.getMonth());
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const secs = date.getSeconds();

  return `\nDate: ${monthName},  ${date.getDate()}  ${year}\n\nTime: ${hours}:${minutes}:${secs}`;
};
