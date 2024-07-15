const getTimeDetails = (miliSecs) => {
  const seconds = Math.floor(miliSecs / 1000);

  // Get hours
  const hours = Math.floor(seconds / 3600);

  // Get minutes
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours: hours, minutes: minutes, seconds: seconds };
};
export default getTimeDetails;
