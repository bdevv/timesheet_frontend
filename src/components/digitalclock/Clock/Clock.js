import React, { useEffect, useState } from "react";

import "./Clock.css";
import { getDateFormat, CLOCK_SIZES, DAYS_ARRAY } from "../utils";
import TextToggled from "../base-components/TextToggled/TextToggled";
import ManagedDigitsClock from "../ManagedDigitsClock/ManagedDigitsClock";
import service from "../../../api/service";
export default function Clock({ size = "medium", timestamp = Date.now(), useInterval = true, isMode24H = true }) {
  const [mode24H, setMode24H] = useState(isMode24H);
  const [localeTime, onTimeChange] = useState(getDateFormat(timestamp, mode24H));
  const [currentDay, setCurrentDay] = useState(localeTime.day);
  const [ampmState, setAmPmState] = useState(localeTime.ampm);
  const sizeObject = CLOCK_SIZES[size] || CLOCK_SIZES.medium;
  useEffect(() => {
    const getServerTime = async () => {
      const response = await service.getCurrentTime();
      onTimeChange(getDateFormat(new Date(response.time), mode24H));
    };
    getServerTime();
  }, [mode24H]);
  return (
    <div className={"clock-component-container"} style={sizeObject}>
      <div className="component-container">
        <div className="days-container">
          {DAYS_ARRAY.map((day, i) => (
            <TextToggled key={i} label={day} isActive={currentDay === day} />
          ))}
        </div>
        <div className="digits-container">
          <ManagedDigitsClock
            ampmState={ampmState}
            updateAmPm={setAmPmState}
            localeTime={localeTime}
            onTimeChange={onTimeChange}
            currentDay={currentDay}
            onDayChange={setCurrentDay}
            useInterval={useInterval}
            mode24H={mode24H}
          />
        </div>
        <div className="bottom-container" onClick={() => setMode24H((m) => !m)} onKeyDown={() => setMode24H((m) => !m)}>
          {mode24H ? (
            <TextToggled label="24H" isActive={mode24H} />
          ) : (
            <>
              <TextToggled label="AM" isActive={ampmState === "AM"} />
              <TextToggled label="PM" isActive={ampmState === "PM"} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
