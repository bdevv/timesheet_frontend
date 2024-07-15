import React, { useEffect, useState } from "react";
import { Button, Checkbox, MenuItem, Select, TextField } from "@mui/material";
import service from "../../api/service";
import { toast } from "react-toastify";
import { Delete, Save } from "@mui/icons-material";
export default function EmployeeTable() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
    { field: "pin", headerName: "Pin", flex: 1, minWidth: 100 },
    // { field: "isAdmin", headerName: "Admin?", flex: 1, minWidth: 100, renderCell: (params) => <Checkbox disabled checked={params.row.isAdmin} /> },
    {
      field: "isManager",
      headerName: "Manager?",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => <Checkbox disabled checked={params.row.isManager} />,
    },
    { field: "payType", headerName: "PayType", flex: 1, minWidth: 100 },
    { field: "payDay", headerName: "PayDay", flex: 1, minWidth: 100 },
    {
      field: "action",
      headerName: "Action",
    },
  ];
  const [rows, setRows] = useState([]);
  const handleAddClick = () => {
    setRows([...rows, { id: rows.length + 1, name: "", pin: "", isManager: false, payType: "weekly", payDay: 0, updated: true }]);
  };
  const handleSaveEmployee = async (row) => {
    try {
      const response = await service.updateEmployee(row);
      if (response.status === true) {
        setRows(rows.map((item) => (item.id === row.id ? row : item)));
        toast.success("Successfully updated");
      }
    } catch (e) {
      toast.warn(e.message);
    }
  };
  const handleDeleteEmployee = async (row) => {
    try {
      const response = await service.deleteEmployee(row._id);
      if (response.status === true) {
        setRows(rows.filter((item) => item._id !== row._id));
        toast.success("Successfully deleted");
      }
    } catch (e) {
      toast.warn(e.message);
    }
  };

  const handleChangeRow = (row) => {
    const updatedRow = { ...row, updated: true };
    setRows(rows.map((item) => (item.id === updatedRow.id ? updatedRow : item)));
  };
  useEffect(() => {
    const getRows = async () => {
      const result = await service.getEmployees();
      if (result.status === true) {
        setRows(
          result.data.map((row, index) => ({
            id: index + 1,
            ...row,
          }))
        );
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
      <div className="clock-table-container min-w-[400px] h-full mt-2 overflow-auto">
        <table className="bg-white">
          <thead>
            <tr>
              {columns.map((item, index) => {
                return <th key={index}>{item.headerName}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr key={index} className={`${row.updated === true ? "text-red-500" : "text-black"} `}>
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
                    <TextField
                      value={row.pin}
                      type="number"
                      size="small"
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "80px",
                        },
                      }}
                      onChange={(e) => {
                        handleChangeRow({ ...row, pin: e.target.value });
                      }}
                    />
                  </td>
                  <td>
                    <Select
                      value={row.isManager ? 1 : 0}
                      size="small"
                      onChange={(e) => handleChangeRow({ ...row, isManager: e.target.value })}
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "100px",
                          textAlign: "left",
                        },
                        "&. MuiInputAdornment-root": {
                          marginLeft: "0px",
                        },
                      }}
                    >
                      <MenuItem value={1}>Manager</MenuItem>
                      <MenuItem value={0}>None</MenuItem>
                    </Select>
                  </td>
                  <td>
                    <Select
                      value={row.payType === undefined ? "" : row.payType}
                      size="small"
                      onChange={(e) => handleChangeRow({ ...row, payType: e.target.value })}
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "100px",
                          textAlign: "left",
                        },
                        "&. MuiInputAdornment-root": {
                          marginLeft: "0px",
                        },
                      }}
                    >
                      <MenuItem value={"weekly"}>Weekly</MenuItem>
                      <MenuItem value={"biweekly"}>Bi-Weekly</MenuItem>
                      <MenuItem value={"monthly"}>Monthly</MenuItem>
                    </Select>
                  </td>

                  <td>
                    {(() => {
                      if (row.payType === "weekly" || row.payType === "biweekly") {
                        return (
                          <Select
                            value={row.payDay}
                            onChange={(e) => {
                              handleChangeRow({ ...row, payDay: e.target.value });
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{
                              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                padding: "5px 5px",
                                width: "110px",
                                textAlign: "left",
                              },
                              "&. MuiInputAdornment-root": {
                                marginLeft: "0px",
                              },
                            }}
                          >
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        );
                      } else if (row.payType === "monthly") {
                        return (
                          <TextField
                            value={row.payDay}
                            type="number"
                            onChange={(e) => {
                              handleChangeRow({ ...row, payDay: e.target.value });
                            }}
                            sx={{
                              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                padding: "5px 5px",
                                width: "120px",
                                textAlign: "left",
                              },
                              "&. MuiInputAdornment-root": {
                                marginLeft: "0px",
                              },
                            }}
                          />
                        );
                      }
                      return null;
                    })()}
                  </td>
                  <td>
                    <div className="flex">
                      <Save
                        className="cursor-pointer hover:bg-blue-200 rounded-full"
                        color="primary"
                        size="small"
                        onClick={() => {
                          handleSaveEmployee(row);
                        }}
                      />
                      <Delete className="cursor-pointer hover:bg-red-200 rounded-full ml-2" color="error" onClick={() => handleDeleteEmployee(row)} />
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
