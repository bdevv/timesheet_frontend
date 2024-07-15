import React from "react";

import "./DigitsClock.css";
import Digit from "../Digit/Digit";

export default function DigitsClock({ time = "00:00:00" }) {
  let [hh, mm, ss] = time?.split(":") || [];

  hh = hh?.padStart(2, "0");
  mm = mm?.padStart(2, "0");
  ss = ss?.padStart(2, "0");

  return (
    <div className="numbers-container digit-small">
      <div className="two-digits">
        {hh.split("").map((digit, index) => (
          <Digit key={`hh ${index}`} value={+digit} />
        ))}
      </div>
      <div className="two-digits">
        {mm.split("").map((digit, index) => (
          <Digit key={`mm ${index}`} value={+digit} />
        ))}
      </div>
      <div className="two-digits">
        {ss.split("").map((digit, index) => (
          <Digit key={`ss ${index}`} value={+digit} />
        ))}
      </div>
    </div>
  );
}
