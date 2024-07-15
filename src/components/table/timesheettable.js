import PlusIcon from "../icons/plus";
import MinusIcon from "../icons/minus";
import moment from "moment";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { Delete, Save } from "@mui/icons-material";
import service from "../../api/service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function TimeSheetTable({ rows, onExpandRow, onChangeRow, onDeleteRow }) {
  const employee_id = useSelector((state) => state.tab.employee_id);
  const columns = [
    { field: "id", headerName: "*", flex: 1, minWidth: 150 },
    { field: "employer", headerName: "Employer", flex: 1, minWidth: 150 },
    { field: "clockInTime", headerName: "Clock In", flex: 1, minWidth: 100 },
    { field: "clockOutTime", headerName: "Clock Out", flex: 1, minWidth: 100 },
    { field: "workingHours", headerName: "Duration", flex: 1, minWidth: 100 },
    { field: "breaking", headerName: "Breaking", flex: 1, minWidth: 100 },
    { field: "paidBreaking", headerName: "Paid", flex: 1, minWidth: 100 },
    { field: "action", headerName: "Action", flex: 1, minWidth: 100 },
  ];
  const [breakTypes, setBreakTypes] = useState([]);
  const getBreakTypes = async () => {
    try {
      const response = await service.getBreaks();
      if (response.status) {
        setBreakTypes(response.data);
      } else {
        toast.warn(response.message);
      }
    } catch (err) {
      toast.warn(err.message);
    }
  };
  const handleBreakingChange = (row, newItem) => {
    if (new Date(newItem.breakInTimeStamp) > new Date(newItem.breakOutTimeStamp)) {
      toast.error("Break out time cannot be before break in time");
      return;
    }
    const index = row.breaks.findIndex((item) => item._id === newItem._id);
    const updatedBreaks = [...row.breaks];
    updatedBreaks[index] = { ...newItem, updated: true };
    const updatedRow = {
      ...row,
      breaks: updatedBreaks,
    };
    onChangeRow(updatedRow);
  };
  const handleSaveTimeSheet = async (row) => {
    try {
      const response = await service.updateTimeSheet(row, employee_id);
      if (response.status === true) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const handleDeleteTimeSheet = async (row) => {
    // if (!confirm("Are you sure you want to delete this timesheet?")) return;
    try {
      const response = await service.deleteTimeSheet(row.id);
      if (response.status === true) {
        onDeleteRow(row);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const handleDeleteBreaking = async (row, item) => {
    const index = row.breaks.findIndex((breakItem) => breakItem._id === item._id);
    if (index !== -1) {
      const updatedBreaks = [...row.breaks];
      updatedBreaks.splice(index, 1);
      const updatedRow = {
        ...row,
        breaks: updatedBreaks,
      };
      onChangeRow(updatedRow);
      handleSaveTimeSheet(updatedRow);
    }
  };
  useEffect(() => {
    getBreakTypes();
  }, []);
  return (
    <div className="clock-table-container min-w-[400px] h-full px-2 overflow-auto ">
      <table className="bg-white">
        <thead>
          <tr>
            {columns.map((item) => {
              return <th>{item.headerName}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <>
                <tr className={`${row.updated === true ? "text-red-500" : "text-black"}`} key={index}>
                  <td>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        onExpandRow(row);
                      }}
                    >
                      {row.expanded === true
                        ? row.breaks.length > 0 && <MinusIcon width={15} height={15} color={"#000000"} />
                        : row.breaks.length > 0 && <PlusIcon width={15} height={15} color={"#000000"} />}
                    </div>
                  </td>
                  <td>{row.name}</td>
                  <td>
                    <DateTimePicker
                      value={moment(row.clockInTimeStamp).local()}
                      ampm={false}
                      format="MM/DD HH:mm"
                      onChange={(value) => {
                        onChangeRow({ ...row, clockInTimeStamp: value.toDate().toISOString() });
                      }}
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "90px",
                        },
                        "&. MuiInputAdornment-root": {
                          marginLeft: "0px",
                        },
                      }}
                    ></DateTimePicker>
                  </td>
                  <td>
                    <DateTimePicker
                      value={moment(row.clockOutTimeStamp).local()}
                      ampm={false}
                      format="MM/DD HH:mm"
                      onChange={(value) => {
                        onChangeRow({ ...row, clockOutTimeStamp: value.toDate().toISOString() });
                      }}
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "90px",
                        },
                        "&. MuiInputAdornment-root": {
                          marginLeft: "0px",
                        },
                      }}
                    ></DateTimePicker>
                  </td>
                  <td>{row.workingHours}</td>
                  <td>{row.breaking}</td>
                  <td>{row.paidBreaking}</td>
                  <td>
                    <div className="flex">
                      <Save
                        className="cursor-pointer hover:bg-blue-200 rounded-full"
                        color="primary"
                        onClick={() => {
                          handleSaveTimeSheet(row);
                        }}
                      />
                      <Delete
                        className="cursor-pointer hover:bg-red-200 rounded-full ml-2"
                        color="error"
                        onClick={() => handleDeleteTimeSheet(row)}
                      />
                    </div>
                  </td>
                </tr>
                {row.expanded === true && row.breaks.length > 0 && (
                  <tr key={index + "_b"}>
                    <td colSpan={8} className="w-full h-full px-4 py-2">
                      <div className="w-full h-full flex flex-col px-4 py-2 bg-white rounded-md items-center justify-center">
                        <span className="text-green-500">Breakings</span>
                        <table className="bg-white mt-2">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Paid</th>
                              <th>Break In</th>
                              <th>Break Out</th>
                              <th>Duration</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.breaks.map((item, index) => {
                              return (
                                <tr className={`${item.updated === true ? "text-red-500" : "text-black"}`} key={index}>
                                  <td className="p-4">
                                    <Select
                                      value={item.break_id._id}
                                      size="small"
                                      onChange={(event) => {
                                        handleBreakingChange(row, { ...item, break_id: breakTypes.find((item) => item._id === event.target.value) });
                                      }}
                                    >
                                      {breakTypes.map((item) => {
                                        return <MenuItem value={item._id}>{item.name}</MenuItem>;
                                      })}
                                    </Select>
                                  </td>
                                  <td>
                                    <div className={`w-full h-full px-2 ${item.break_id.isPaid ? "bg-blue-300" : "bg-red-300"} rounded-xl`}>
                                      {item.break_id.isPaid ? "Paid" : "Unpaid"}
                                    </div>
                                  </td>
                                  <td>
                                    <TimePicker
                                      ampm={false}
                                      value={moment(item.breakInTimeStamp).local()}
                                      onChange={(value) => {
                                        const newTimestamp = value.toDate().getTime();
                                        const newSeconds = Math.floor(newTimestamp / 1000);
                                        const desiredSeconds = newSeconds - (newSeconds % 60); // Set the seconds to 0
                                        const updatedTimestamp = desiredSeconds * 1000;
                                        handleBreakingChange(row, { ...item, breakInTimeStamp: updatedTimestamp });
                                      }}
                                      sx={{
                                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                          padding: "5px 5px",
                                          width: "50px",
                                        },
                                      }}
                                    ></TimePicker>
                                  </td>
                                  <td>
                                    <TimePicker
                                      ampm={false}
                                      value={moment(item.breakOutTimeStamp).local()}
                                      onChange={(value) => {
                                        const newTimestamp = value.toDate().getTime();
                                        const newSeconds = Math.floor(newTimestamp / 1000);
                                        const desiredSeconds = newSeconds - (newSeconds % 60); // Set the seconds to 0
                                        const updatedTimestamp = desiredSeconds * 1000;
                                        handleBreakingChange(row, { ...item, breakOutTimeStamp: updatedTimestamp });
                                      }}
                                      sx={{
                                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                          padding: "5px 5px",
                                          width: "50px",
                                        },
                                      }}
                                    ></TimePicker>
                                  </td>
                                  <td>
                                    {(
                                      (isNaN(moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp))
                                        ? 0
                                        : moment(item.breakOutTimeStamp) - moment(item.breakInTimeStamp)) /
                                      1000 /
                                      60
                                    ).toFixed(0) + " mins"}
                                  </td>
                                  <td>
                                    <div className="flex">
                                      <Save
                                        className="cursor-pointer hover:bg-blue-200 rounded-full"
                                        color="primary"
                                        onClick={() => {
                                          handleSaveTimeSheet(row);
                                        }}
                                      />
                                      <Delete
                                        className="cursor-pointer hover:bg-red-200 rounded-full ml-2"
                                        color="error"
                                        onClick={() => handleDeleteBreaking(row, item)}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
