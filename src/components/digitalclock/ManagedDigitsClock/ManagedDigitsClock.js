/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

import DigitsClock from "../base-components/DigitsClock/DigitsClock";
import { getDateFormat } from "../utils/index";

export default function ManagedDigitsClock({ ampmState, updateAmpm, localeTime, onTimeChange, onDayChange, useInterval = true, mode24H = false }) {
  const { day, time, ampm } = localeTime ?? {};

  useEffect(() => {
    const timerInterval =
      useInterval &&
      setInterval(() => {
        onTimeChange?.((date) => getDateFormat(date.timestamp + 1000, date.is24HoursMode));
      }, 1000);

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [useInterval]);

  useEffect(() => {
    onDayChange?.(day);
  }, [day]);

  useEffect(() => {
    updateAmpm?.(ampm);
  }, [ampm]);

  useEffect(() => {
    onTimeChange?.((date) => getDateFormat(date.timestamp, mode24H));
  }, [mode24H, ampmState]);

  return <DigitsClock time={time} />;
}
