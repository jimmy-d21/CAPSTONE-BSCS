function getCurrentTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // if 0, make it 12

  // Add leading zero to minutes if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}

export default getCurrentTime;
