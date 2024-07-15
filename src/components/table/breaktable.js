import * as React from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import service from "../../api/service";
import { toast } from "react-toastify";
import { Delete, Save } from "@mui/icons-material";
export default function BreakTable() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "limit", headerName: "Limit", flex: 2 },
    { field: "isPaid", headerName: "Paid", flex: 1 },
    {
      field: "action",
      headerName: "Action",
    },
  ];
  const [rows, setRows] = React.useState([]);

  const handleAddClick = () => {
    setRows([...rows, { id: rows.length + 1, name: "", limit: "", isPaid: false, updated: true }]);
  };
  const handleSaveBreaking = async (row) => {
    try {
      const response = await service.updateBreak(row);
      if (response.status === true) {
        setRows(rows.map((item) => (item.id === row.id ? row : item)));
        toast.success("Successfully updated");
      }
    } catch (e) {
      toast.warn(e.message);
    }
  };
  const handleDeleteBreaking = async (row) => {
    try {
      const response = await service.deleteBreak(row._id);
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
  React.useEffect(() => {
    const getRows = async () => {
      const result = await service.getBreaks();
      if (result.status === true) {
        setRows(result.data.map((row, index) => ({ id: index + 1, ...row, limit: row.limit ? row.limit : "", updated: false })));
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
      <div className="clock-table-container min-w-[400px] h-full mt-2 p-2 overflow-auto">
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
                <tr key={index} className={`${row.updated === true ? "text-red-500" : "text-black"}`}>
                  <td>{index + 1}</td>
                  <td>
                    <TextField
                      value={row.name}
                      size="small"
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "120px",
                        },
                      }}
                      onChange={(e) => {
                        handleChangeRow({ ...row, name: e.target.value });
                      }}
                    />
                  </td>
                  <td>
                    <TextField
                      value={row.limit}
                      size="small"
                      sx={{
                        "& .MuiInputBase-input.MuiOutlinedInput-input": {
                          padding: "5px 5px",
                          width: "50px",
                        },
                      }}
                      onChange={(e) => {
                        handleChangeRow({ ...row, limit: e.target.value });
                      }}
                    />
                  </td>
                  <td>
                    <Select value={row.isPaid ? 1 : 0} size="small" onChange={(e) => handleChangeRow({ ...row, isPaid: e.target.value })}>
                      <MenuItem value={1}>Paid</MenuItem>
                      <MenuItem value={0}>Unpaid</MenuItem>
                    </Select>
                  </td>
                  <td>
                    <div className="flex">
                      <Save
                        className="cursor-pointer hover:bg-blue-200 rounded-full"
                        color="primary"
                        size="small"
                        onClick={() => {
                          handleSaveBreaking(row);
                        }}
                      />
                      <Delete className="cursor-pointer hover:bg-red-200 rounded-full ml-2" color="error" onClick={() => handleDeleteBreaking(row)} />
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
