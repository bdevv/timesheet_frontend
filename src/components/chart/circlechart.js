import React from "react";

const CircleChart = ({ percent }) => {
  return (
    <div className="flex-grow-0 flex-shrink-0 w-[88px] h-[88px] relative">
      <div className="w-20 h-20">
        <svg
          width="85"
          height="84"
          viewBox="0 0 85 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[2.06px] top-0.5"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="42.0613" cy="42" r="40" stroke="#E8E8E8" strokeWidth="4"></circle>
        </svg>
        <svg
          width="89"
          height="88"
          viewBox="0 0 89 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[0.06px] top-0"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="44.0613"
            cy="44"
            r="40"
            stroke={percent > 60 ? "#ADEB47" : percent <= 60 && percent >= 25 ? "#EBDD47" : "#EB5047"}
            strokeWidth="8"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={2 * Math.PI * 40 * (1 - percent / 100)}
            transform="rotate(70, 44, 44)"
          ></circle>
        </svg>
        <div className="flex w-[70px] justify-center absolute left-[10px] top-[28px] items-center text-center">
          <p className="flex-grow-0 flex-shrink-0 text-[28px] font-InterBold text-left text-[#272a22] leading-8">{percent}</p>
          <p className="flex-grow-0 flex-shrink-0 text-base font-InterBold text-left text-[#272a22] " style={{ verticalAlign: "bottom" }}>
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default CircleChart;
