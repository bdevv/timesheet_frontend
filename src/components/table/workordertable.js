import * as React from "react";
import { Button, TextField } from "@mui/material";
import service from "../../api/service";
import { toast } from "react-toastify";
import { Delete, Save } from "@mui/icons-material";
export default function WorkOrderTable() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" color="error" onClick={() => handleDeleteClick(params.row.name)}>
          DEL
        </Button>
      ),
    },
  ];
  const [rows, setRows] = React.useState([]);

  const handleDeleteClick = async (name) => {
    try {
      const response = await service.deleteWorkOrder(name);
      if (response.status === true) {
        setRows(rows.filter((row) => row.name !== name));
        toast.success("Successfully deleted");
      }
    } catch (e) {
      toast.warn(e.message);
    }
  };

  const handleAddClick = () => {
    setRows([...rows, { id: rows.length + 1, name: "", updated: true }]);
  };
  const handleSaveWorkOrder = async (row) => {
    try {
      const response = await service.updateWorkOrder(row);
      if (response.status === true) {
        setRows(rows.map((item) => (item.id === row.id ? row : item)));
        toast.success("Successfully updated");
      }
    } catch (e) {
      toast.warn(e.message);
    }
  };
  const handleDeleteWorkOrder = async (row) => {
    try {
      const response = await service.deleteWorkOrder(row._id);
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
      const result = await service.getWorkOrders();
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

      <div className="clock-table-container min-w-[400px] h-full mt-2 overflow-auto">
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
                          width: "150px",
                        },
                      }}
                      onChange={(e) => {
                        handleChangeRow({ ...row, name: e.target.value });
                      }}
                    />
                  </td>
                  <td>
                    <div className="flex">
                      <Save
                        className="cursor-pointer hover:bg-blue-200 rounded-full"
                        color="primary"
                        size="small"
                        onClick={() => {
                          handleSaveWorkOrder(row);
                        }}
                      />
                      <Delete
                        className="cursor-pointer hover:bg-red-200 rounded-full ml-2"
                        color="error"
                        onClick={() => handleDeleteWorkOrder(row)}
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
