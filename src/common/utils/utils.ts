export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(date: Date): string {
  var hours = date.getHours();
  var minutes: number | string = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getDate() +
    " " +
    MONTHS[date.getMonth()] +
    " " +
    date.getFullYear() +
    "  " +
    strTime
  );
}

export function trimText(text: string, maxLength: number): string {
  if (
    isNaN(maxLength) ||
    typeof text != "string" ||
    typeof maxLength != "number"
  ) {
    return "";
  }
  return text.length > maxLength ? text.slice(0, maxLength - 1) + "..." : text;
}
