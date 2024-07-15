import React from "react";
import classNames from "classnames";

import "./TextToggled.css";

export default function TextToggled({ label = "unTitled", isActive = false, onClick = undefined }) {
  const className = classNames("text-style", { passive: !isActive });

  return (
    <div className={className} onClick={onClick} onKeyDown={onClick}>
      {label}
    </div>
  );
}
