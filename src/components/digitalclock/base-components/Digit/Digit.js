import React from "react";

import "./Digit.css";
import { ACTIVE_LINES_BY_NUMBER, TRAPEZOIDS } from "../../utils";

export default function Digit({ value = 0 }) {
  return (
    <div className="digit-container">
      {TRAPEZOIDS.map((divNumber, index) => {
        const isActive = ACTIVE_LINES_BY_NUMBER[value].includes(divNumber);
        return <div key={index} className={`d-shape ${isActive ? `d${divNumber}-shape` : `passive d${divNumber}-shape`}`} />;
      })}
    </div>
  );
}
