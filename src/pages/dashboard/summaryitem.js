import React from "react";
import WorkingIcon from "../../components/icons/working";
import DayWorkingTimeIcon from "../../components/icons/dayworkingtime";
import TotalAccuminatedHoursIcon from "../../components/icons/totalaccuminatedhours";
import CircleChart from "../../components/chart/circlechart";

const SummaryItem = ({ text1, text2, hours, mins, breakingHours, breakingMins, paidBreakingHours, paidBreakingMins, index }) => {
  const totalWorkingHours = hours * 60 + mins;
  const totalBreakingHours = breakingHours * 60 + breakingMins;
  const percent = isNaN(totalWorkingHours / (totalBreakingHours + totalWorkingHours))
    ? 0
    : ((totalWorkingHours / (totalBreakingHours + totalWorkingHours)) * 100).toFixed(0);
  return (
    <div
      className=" h-[200px] flex flex-col  items-start flex-grow  px-4 pt-4 rounded-2xl bg-white border border-[#f2f2f2]"
      style={{
        boxShadow: "0px 1px 1px 0 rgba(34,37,30,0.04), 0px 3px 20px 0 rgba(52,53,49,0.05)",
      }}
    >
      <div className="flex w-full items-start flex-grow-0 flex-shrink-0  relative gap-2 justify-between">
        <p className="flex-grow w-[108px] text-xs font-InterBold text-left text-[#8d8d8b]">
          {text1}
          <br />
          {text2}
        </p>
        {index === 1 ? (
          <WorkingIcon color={"#3b82f6"} height={32} width={32}></WorkingIcon>
        ) : index === 2 ? (
          <DayWorkingTimeIcon color={"#ef4444"} height={32} width={32}></DayWorkingTimeIcon>
        ) : (
          <TotalAccuminatedHoursIcon color={"#eab308"} height={32} width={32}></TotalAccuminatedHoursIcon>
        )}
      </div>
      <div className="flex justify-start items-end flex-grow-0 flex-shrink-0 w-full h-8 relative gap-0.5 bottom-4  mt-8">
        <div className="flex w-full h-full justify-between items-between">
          <div className="flex flex-col w-full">
            <div className="flex w-full h-full items-center justify-start">
              <p className="w-[70px] flex-grow-0 flex-shrink-0 text-base font-InterBold text-left text-[#272a22] ">Working: </p>
              <p className="w-[120px] flex-grow-0 flex-shrink-0 text-[36px] font-mono text-end text-[#272a22] leading-10 ml-2">
                {hours}:{padNumber(mins)}
              </p>
            </div>
            <div className="flex w-full h-full items-center mt-2 justify-start">
              <p className="w-[70px] flex-grow-0 flex-shrink-0 text-base font-InterBold text-left text-[#272a22] ">Breaking: </p>
              <p className="w-[120px] flex-grow-0 flex-shrink-0 text-[36px] font-mono text-end text-[#272a22] ml-2">
                {breakingHours}:{padNumber(breakingMins)}
              </p>
            </div>
            <div className="flex w-full h-full items-center mt-2 justify-start">
              <p className="w-[70px] flex-grow-0 flex-shrink-0 text-base font-InterBold text-left text-[#272a22] ">Paid: </p>
              <p className="w-[120px] flex-grow-0 flex-shrink-0 text-[36px] font-mono text-end text-[#272a22] ml-2">
                {paidBreakingHours}:{padNumber(paidBreakingMins)}
              </p>
            </div>
          </div>
          <CircleChart percent={percent}></CircleChart>
        </div>
      </div>
    </div>
  );
};
export default SummaryItem;
function padNumber(num) {
  return num.toString().padStart(2, "0");
}
