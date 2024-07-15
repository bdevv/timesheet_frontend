import React, { useEffect, useState } from "react";
import TimeSheetTable from "../../components/table/timesheettable";
import { Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import service from "../../api/service";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import getTimeDetails from "../../utils/util";
const TimeSheet = () => {
  const employee_id = useSelector((state) => state.tab.employee_id);

  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const handleDatePickerChange = (event) => {
    setSelectedDate(event);
  };
  const handleExpandRow = (row) => {
    const updatedRows = rows.map((item) => {
      if (item.id === row.id) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setRows(updatedRows);
  };
  const handleDeleteRow = (row) => {
    const index = rows.findIndex((item) => item.id === row.id);
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  const handleChangeRow = (row) => {
    if (new Date(row.clockInTimeStamp) > new Date(row.clockOutTimeStamp)) {
      toast.error("Clock Out time should be greater than Clock In time");
      return;
    }
    const index = rows.findIndex((item) => item.id === row.id);
    const updatedRows = [...rows];

    let breaking = 0;
    let paidBreaking = 0;
    if (row.breaks) {
      row.breaks.map((item) => {
        if (item.break_id.isPaid === true) {
          let period = isNaN(moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp))
            ? 0
            : moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp);
          if (item.break_id.limit !== undefined && item.break_id.limit !== null) {
            if (period > item.break_id.limit * 60 * 1000) {
              period = item.break_id.limit * 60 * 1000;
            }
            paidBreaking += period;
          } else paidBreaking += period;
        }
        breaking += moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp);
      });
    }
    updatedRows[index] = {
      ...row,
      breaking: getTimeDetails(breaking).hours + "h " + getTimeDetails(breaking).minutes + "m",
      paidBreaking: getTimeDetails(paidBreaking).hours + "h " + getTimeDetails(paidBreaking).minutes + "m",
      updated: true,
      workingHours:
        row.clockOutTimeStamp === undefined || row.clockOutTimeStamp === null
          ? ""
          : getTimeDetails(moment(row.clockOutTimeStamp) - moment(row.clockInTimeStamp)).hours +
            "h " +
            getTimeDetails(moment(row.clockOutTimeStamp) - moment(row.clockInTimeStamp)).minutes +
            "m",
    };
    setRows(updatedRows);
  };
  useEffect(() => {
    const getRows = async () => {
      try {
        const result = await service.getAllTimeSheets(selectedDate.format("YYYY-MM-DD"));
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
                  let period = isNaN(moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp))
                    ? 0
                    : moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp);
                  if (item.break_id.limit !== undefined && item.break_id.limit !== null) {
                    if (period > item.break_id.limit * 60 * 1000) {
                      period = item.break_id.limit * 60 * 1000;
                    }
                    paidBreaking += period;
                  } else paidBreaking += period;
                }
                breaking += isNaN(moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp))
                  ? 0
                  : moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp);
              });
            }
            data.push({
              id: row._id,
              updated: false,
              expanded: false,
              name: row.employee_id.name,
              date: clockInTime.substring(0, 10),
              clockInTimeStamp: row.clockInTimeStamp,
              clockOutTimeStamp: row.clockOutTimeStamp,
              breaks: row.breaks.map((item) => ({ updated: false, ...item })),
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
    getRows();
  }, [selectedDate, employee_id]);
  return (
    <div className="w-full">
      <div className="flex items-center text-start bg-white p-2 mt-2">
        <Typography fontSize={13} width={100}>
          Work Date Filter:
        </Typography>
        <DatePicker
          views={["year", "month", "day"]}
          fontSize={13}
          style={{ width: "150px" }}
          value={selectedDate}
          onChange={handleDatePickerChange}
        />
      </div>
      <div className="w-full mt-4">
        <TimeSheetTable rows={rows} onExpandRow={handleExpandRow} onChangeRow={handleChangeRow} onDeleteRow={handleDeleteRow}></TimeSheetTable>
      </div>
    </div>
  );
};

export default TimeSheet;
