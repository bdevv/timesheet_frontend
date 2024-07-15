import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddMessageDialog from "../dialog/addmessagedialog";
import service from "../../api/service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function MessagesTable() {
  const employee_id = useSelector((state) => state.tab.employee_id);
  const isManager = useSelector((state) => state.tab.isManager);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
    { field: "recipients", headerName: "Recipients", flex: 2, minWidth: 100 },
    { field: "type", headerName: "Type", flex: 1, minWidth: 70 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 70 },
    { field: "message", headerName: "Message", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteClick(params.row._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  const [messages, setMessages] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };
  const handleDeleteClick = async (id) => {
    try {
      const response = await service.deleteMessage(id);
      if (response.status) {
        setMessages(messages.filter((message) => message._id !== id));
        toast.success("Successfully deleted");
      } else toast.error(response.message);
    } catch (e) {
      toast.warn(e.message);
    }
  };
  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
  };
  const handleAddDialogSubmit = async (to, employees, workShifts, workOrders, subject, type, content) => {
    try {
      const response = await service.addMessage(employee_id, to, employees, workShifts, workOrders, subject, type, content);
      if (response.status) {
        let results = null;
        if (isManager === undefined || isManager === null) results = await service.getMessages(null);
        else results = await service.getMessages(employee_id);
        if (results.status === true) {
          const result = results.data;
          setMessages(
            result.map((item, index) => {
              const employeeNames = item.employees.map((employee) => employee.name).join(", ");
              const workOrderNames = item.workOrders.map((workOrder) => workOrder.name).join(", ");
              const workShiftNames = item.workShifts.map((workShift) => workShift.name).join(", ");
              return {
                id: index + 1,
                _id: item._id,
                recipients:
                  item.to === "All"
                    ? "All"
                    : item.to === "Employees"
                    ? employeeNames
                    : item.to === "WorkShift"
                    ? workShiftNames
                    : item.to === "WorkOrder"
                    ? workOrderNames
                    : "Home",
                type: item.type,
                date: item.created_at.substring(0, 10) + " " + item.created_at.substring(11, 19),
                message: item.message,
              };
            })
          );
        } else toast.warn(response.message);
        toast.success("Successfully added");
      } else toast.error(response.message);
    } catch (e) {
      toast.warn(e.message);
    }
    handleAddDialogClose();
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        let response;
        if (isManager === undefined || isManager === null) response = await service.getMessages(null);
        else response = await service.getMessages(employee_id);
        if (response.status === true) {
          const result = response.data;
          setMessages(
            result.map((item, index) => {
              const employeeNames = item.employees.map((employee) => employee.name).join(", ");
              const workOrderNames = item.workOrders.map((workOrder) => workOrder.name).join(", ");
              const workShiftNames = item.workShifts.map((workShift) => workShift.name).join(", ");
              return {
                id: index + 1,
                _id: item._id,
                recipients:
                  item.to === "All"
                    ? "All"
                    : item.to === "Employees"
                    ? employeeNames
                    : item.to === "WorkShift"
                    ? workShiftNames
                    : item.to === "WorkOrder"
                    ? workOrderNames
                    : "Home",
                type: item.type,
                date: item.created_at.substring(0, 10) + " " + item.created_at.substring(11, 19),
                message: item.message,
              };
            })
          );
        } else toast.warn(response.message);
      } catch (err) {
        toast.warn(err.message);
      }
    };
    getMessages();
  }, [employee_id, isManager]);

  return (
    <div>
      {isAddDialogOpen && (
        <AddMessageDialog isAddDialogOpen={isAddDialogOpen} onAddDialogClose={handleAddDialogClose} onAddDialogSubmit={handleAddDialogSubmit} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          New Message
        </Button>
      </div>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={messages}
          columns={columns}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#656565",
              color: "white",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "rgba(0, 0, 255, 0.05)",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          disableColumnSorting
          disableColumnFilter
          pageSizeOptions={[10, 20]}
          disableMultipleRowSelection
        />
      </Box>
    </div>
  );
}
