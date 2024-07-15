import React, { useEffect, useState } from "react";
import ClockInOutTable from "../../components/table/clockinouttable";
import SummaryItem from "./summaryitem";
import service from "../../api/service";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import getTimeDetails from "../../utils/util";
import { useSelector } from "react-redux";
const ClockInOut = () => {
  const employee_id = useSelector((state) => state.tab.employee_id);
  const [rows, setRows] = useState([]);
  const [totalDuration, setTotalDuration] = useState({ hours: 0, minutes: 0 });
  const [totalBreakingDuration, setTotalBreakingDuration] = useState({ hours: 0, minutes: 0 });
  const [totalPaidBreakingDuration, setTotalPaidBreakingDuration] = useState({ hours: 0, minutes: 0 });
  const [todayDuration, setTodayDuration] = useState({ hours: 0, minutes: 0 });
  const [todayBreakingDuration, setTodayBreakingDuration] = useState({ hours: 0, minutes: 0 });
  const [todayPaidBreakingDuration, setTodayPaidBreakingDuration] = useState({ hours: 0, minutes: 0 });
  const [paidDuration, setPaidDuration] = useState({ hours: 0, minutes: 0 });
  const [paidBreakingDuration, setPaidBreakingDuration] = useState({ hours: 0, minutes: 0 });
  const [paidPaidBreakingDuration, setPaidPaidBreakingDuration] = useState({ hours: 0, minutes: 0 });
  const [todayDate, setTodayValue] = useState(moment());
  const handleExpandRow = (row) => {
    const updatedRows = rows.map((item) => {
      if (item.id === row.id) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setRows(updatedRows);
  };
  useEffect(() => {
    const getRows = async () => {
      try {
        if (employee_id === "admin" || employee_id === null) {
          return;
        }
        const result = await service.getClockInOutByEmployee(employee_id);
        let ind = 0;
        let data = [];
        if (result.status === true) {
          result.data.map((row, index) => {
            ind++;
            const clockInTime = moment(row.clockInTimeStamp).local().format("MM-DD HH:mm");
            const clockOutTime =
              row.clockOutTimeStamp === undefined || row.clockOutTimeStamp === null
                ? ""
                : moment(row.clockOutTimeStamp).local().format("MM-DD HH:mm");
            let breaking = 0;
            let paidBreaking = 0;
            if (row.breaks) {
              row.breaks.map((item) => {
                if (item.break_id.isPaid === true) {
                  paidBreaking += moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp);
                }
                breaking += moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp);
              });
            }
            data.push({
              id: row._id,
              expanded: false,
              name: row.employee_id.name,
              date: clockInTime.substring(0, 10),
              clockInTime,
              clockOutTime,
              breaks: row.breaks,
              breaking: getTimeDetails(breaking).hours + "h " + getTimeDetails(breaking).minutes + "m",
              paidBreaking: getTimeDetails(paidBreaking).hours + "h " + getTimeDetails(paidBreaking).minutes + "m",
              workingHours:
                row.clockOutTimeStamp === undefined || row.clockOutTimeStamp === null
                  ? ""
                  : getTimeDetails(moment(row.clockOutTimeStamp) - moment(row.clockInTimeStamp)).hours +
                    "h " +
                    getTimeDetails(moment(row.clockOutTimeStamp) - moment(row.clockInTimeStamp)).minutes +
                    "m",
            });
            return null;
          });
          setRows(data);
        } else {
          toast.warn(result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    const calculateAll = async () => {
      if (employee_id === "admin" || employee_id === null) {
        return;
      }
      const result = await service.getAllByEmployee(employee_id, todayDate.local().format("YYYY-MM-DD"));
      if (result.status === true) {
        if (result.todayData) {
          const workingTime = getTimeDetails(result.todayData.working);
          const breakingTime = getTimeDetails(result.todayData.breaking);
          const paidBreakingTime = getTimeDetails(result.todayData.paidBreaking);
          setTodayDuration({ hours: workingTime.hours, minutes: workingTime.minutes });
          setTodayBreakingDuration({ hours: breakingTime.hours, minutes: breakingTime.minutes });
          setTodayPaidBreakingDuration({ hours: paidBreakingTime.hours, minutes: paidBreakingTime.minutes });
        }
        if (result.payData) {
          const workingTime = getTimeDetails(result.payData.working);
          const breakingTime = getTimeDetails(result.payData.breaking);
          const paidBreakingTime = getTimeDetails(result.payData.paidBreaking);
          setPaidDuration({ hours: workingTime.hours, minutes: workingTime.minutes });
          setPaidBreakingDuration({ hours: breakingTime.hours, minutes: breakingTime.minutes });
          setPaidPaidBreakingDuration({ hours: paidBreakingTime.hours, minutes: paidBreakingTime.minutes });
        }
        if (result.totalData) {
          const workingTime = getTimeDetails(result.totalData.working);
          const paidBreakingTime = getTimeDetails(result.totalData.paidBreaking);
          const breakingTime = getTimeDetails(result.totalData.breaking);
          setTotalDuration({ hours: workingTime.hours, minutes: workingTime.minutes });
          setTotalBreakingDuration({ hours: breakingTime.hours, minutes: breakingTime.minutes });
          setTotalPaidBreakingDuration({ hours: paidBreakingTime.hours, minutes: paidBreakingTime.minutes });
        }
      } else {
        toast.warn(result.message);
      }
    };
    getRows();
    calculateAll();
  }, [todayDate, employee_id]);
  return (
    <div className=" flex flex-col w-full">
      <div className="flex w-full ">
        <DatePicker
          label="Select Date"
          value={moment.utc(todayDate).local()}
          className="bg-white"
          onChange={(newValue) => {
            setTodayValue(newValue);
          }}
        />
      </div>
      <div className=" flex flex-col sm:flex-row w-full gap-2 mt-4">
        <SummaryItem
          text1={"Hours worked"}
          text2={"for the day"}
          hours={todayDuration.hours}
          mins={todayDuration.minutes}
          breakingHours={todayBreakingDuration.hours}
          breakingMins={todayBreakingDuration.minutes}
          paidBreakingHours={todayPaidBreakingDuration.hours}
          paidBreakingMins={todayPaidBreakingDuration.minutes}
          index={1}
        ></SummaryItem>
        <SummaryItem
          text1={"Hours worked"}
          text2={"for the current pay period"}
          hours={paidDuration.hours}
          mins={paidDuration.minutes}
          breakingHours={paidBreakingDuration.hours}
          breakingMins={paidBreakingDuration.minutes}
          paidBreakingHours={paidPaidBreakingDuration.hours}
          paidBreakingMins={paidPaidBreakingDuration.minutes}
          index={2}
        ></SummaryItem>
        <SummaryItem
          text1={"Total"}
          text2={"accumlated hours"}
          hours={totalDuration.hours}
          mins={totalDuration.minutes}
          breakingHours={totalBreakingDuration.hours}
          breakingMins={totalBreakingDuration.minutes}
          paidBreakingHours={totalPaidBreakingDuration.hours}
          paidBreakingMins={totalPaidBreakingDuration.minutes}
          index={3}
        ></SummaryItem>
      </div>
      <div className="w-full h-full my-4 overflow-x-auto">
        <ClockInOutTable rows={rows} onExpandRow={handleExpandRow}></ClockInOutTable>
      </div>
    </div>
  );
};

export default ClockInOut;
