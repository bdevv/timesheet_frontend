import * as React from "react";
import { Button, TextField } from "@mui/material";
import service from "../../api/service";
import { toast } from "react-toastify";
import { Delete, Save } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
export default function WorkShiftTable() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "startTime", headerName: "Start", flex: 1 },
    { field: "endTime", headerName: "End", flex: 1 },
    {
      field: "action",
      headerName: "Action",
    },
  ];
  const [rows, setRows] = React.useState([]);

  const handleChangeRow = (row) => {
    const updatedRow = { ...row, updated: true };
    setRows(rows.map((item) => (item.id === updatedRow.id ? updatedRow : item)));
  };
  const handleDeleteWorkShift = async (row) => {
    try {
      const response = await service.deleteWorkShift(row._id);
      if (response.status === true) {
        setRows(rows.filter((item) => item._id !== row._id));
        toast.success("Successfully deleted");
      }
    } catch (e) {
      toast.warn(e.message);
    }
  };
  const handleAddClick = () => {
    setRows([...rows, { id: rows.length + 1, name: "", startTime: "00:00", endTime: "00:00", updated: true }]);
  };
  const handleSaveWorkShift = async (row) => {
    try {
      const response = await service.updateWorkShift(row);
      if (response.status === true) {
        setRows(rows.map((item) => (item.id === row.id ? row : item)));
        toast.success("Successfully updated");
      }
    } catch (e) {
      toast.warn(e.message);
    }
  };

  React.useEffect(() => {
    const getRows = async () => {
      const result = await service.getWorkShifts();
      if (result.status === true) {
        setRows(result.data.map((row, index) => ({ id: index + 1, ...row })));
      } else {
        toast.warn(result.message);
      }
    };
    getRows();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add
        </Button>
      </div>
      <div className="clock-table-container min-w-[400px] h-full mt-2 overflow-auto ">
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
              const startTimeMoment = moment();
              const endTimeMoment = moment();
              if (row.startTime !== null && row.startTime !== undefined && row.startTime !== "") {
                startTimeMoment.set("hour", parseInt(row.startTime.split(":")[0]));
                startTimeMoment.set("minute", parseInt(row.startTime.split(":")[1]));
                startTimeMoment.set("second", 0);
              }
              if (row.endTime !== null && row.endTime !== undefined && row.endTime !== "") {
                endTimeMoment.set("hour", parseInt(row.endTime.split(":")[0]));
                endTimeMoment.set("minute", parseInt(row.endTime.split(":")[1]));
                endTimeMoment.set("second", 0);
              }
              return (
                <tr key={index} className={`${row.updated === true ? "text-red-500" : "text-black"}`}>
                  <td>{index + 1}</td>
                  <td>
                    <TextField
                      value={row.name}
                      size="small"
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "100px",
                        },
                      }}
                      onChange={(e) => {
                        handleChangeRow({ ...row, name: e.target.value });
                      }}
                    />
                  </td>
                  <td>
                    <TimePicker
                      ampm={false}
                      value={startTimeMoment.local()}
                      onChange={(value) => {
                        console.log(value);
                        handleChangeRow({ ...row, startTime: value.format("HH:mm") });
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
                      value={endTimeMoment.local()}
                      onChange={(value) => {
                        handleChangeRow({ ...row, endTime: value.format("HH:mm") });
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
                    <div className="flex">
                      <Save
                        className="cursor-pointer hover:bg-blue-200 rounded-full"
                        color="primary"
                        size="small"
                        onClick={() => {
                          handleSaveWorkShift(row);
                        }}
                      />
                      <Delete
                        className="cursor-pointer hover:bg-red-200 rounded-full ml-2"
                        color="error"
                        onClick={() => handleDeleteWorkShift(row)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
