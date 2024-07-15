// eslint-disable-next-line import/no-cycle
import { DAYS_ARRAY } from "./consts";
/**
 * Modifies the given time units {hours, minutes, seconds} to ensure that each unit
 * consists of two digits. Returns all the units combined into a string format "HH:MM:SS".
 *
 * @param {Object} timeUnits - An object containing time units: {hours, minutes, seconds}.
 * @param {number} timeUnits.hours - The number of hours to format.
 * @param {number} timeUnits.minutes - The number of minutes to format.
 * @param {number} timeUnits.seconds - The number of seconds to format.
 *
 * @returns {string} - The formatted time units in the format "HH:MM:SS".
 */
export function assertTwoDigitsTimeUnits({ hours = 0, minutes = 0, seconds = 0 }) {
  hours = `${hours}`?.padStart(2, "0");
  minutes = `${minutes}`?.padStart(2, "0");
  seconds = `${seconds}`?.padStart(2, "0");

  return [hours, minutes, seconds].join(":");
}

/**
 *
 * The function "getDateFormat" accepts a number "timestamp" and returns an object
 * containing the date properties from the provided timestamp.
 * If no timestamp is provided, it returns the current date.
 * @param {number} [timestamp] - The timestamp to generate the date properties from.
 * @param {boolean} [is24HoursMode] - If true, uses 24-hour format instead of 12-hour format.
 * @returns {{
 *   day: string,
 *   time: string,
 *   ampm: string,
 *   timestamp: number,
 *   is24HoursMode: boolean
 *   }} - An object containing the date properties.
 */
export function getDateFormat(timestamp = undefined, is24HoursMode = undefined) {
  const date = typeof timestamp !== "number" ? new Date() : new Date(timestamp);

  const currentTimestamp = date.getTime();
  const day = DAYS_ARRAY[date.getDay()];

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  if (!is24HoursMode) hours %= 12;

  const time = assertTwoDigitsTimeUnits({ hours, minutes, seconds });
  return {
    day,
    time,
    ampm,
    timestamp: currentTimestamp,
    is24HoursMode,
  };
}
