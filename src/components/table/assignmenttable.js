import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import service from "../../api/service";
import { toast } from "react-toastify";
import AssignDialog from "../dialog/assigndialog";
import { useEffect, useState } from "react";
export default function AssignmentTable() {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "workOrders", headerName: "WorkOrder", flex: 2 },
    { field: "workShifts", headerName: "WorkShift", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() => {
            console.log(params);
            handleAssignClick(params.row.employee_id);
          }}
        >
          ASSIGN
        </Button>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [workShifts, setWorkShifts] = useState([]);

  const handleAssignClick = async (employee_id) => {
    setSelectedEmployee(employee_id);
    setIsAssignDialogOpen(true);
  };
  const handleAssignDialogClose = () => {
    setIsAssignDialogOpen(false);
  };
  const handleAssignDialogSubmit = async (employee, workOrder_ids, workShift_ids) => {
    try {
      const response = await service.addAssignment(employee, workOrder_ids, workShift_ids);
      if (response.status) {
        const updatedRows = rows.map((row) => {
          if (row.employee_id === employee) {
            const workOrder_names = workOrder_ids
              .map((item) => {
                const workOrder = workOrders.find((ws) => ws._id.toString() === item.toString());
                return workOrder ? workOrder.name : "";
              })
              .filter(Boolean)
              .join(", ");
            const workShift_names = workShift_ids
              .map((item) => {
                const workShift = workShifts.find((ws) => ws._id.toString() === item.toString());
                return workShift ? workShift.name : "";
              })
              .filter(Boolean)
              .join(", ");

            // const workOrder = workOrders.find((workOrder) => workOrder._id === workorder);
            return {
              ...row,
              workOrders: workOrder_names,
              workShifts: workShift_names,
            };
          } else return { ...row };
        });
        setRows(updatedRows);
        toast.success("Successfully assigned");
      } else toast.error(response.message);
    } catch (e) {
      toast.warn(e.message);
    }
    setIsAssignDialogOpen(false);
  };
  useEffect(() => {
    const getRows = async () => {
      const result = await service.getAssignments();
      if (result.status === true) {
        setRows(
          result.data.map((row, index) => {
            const workOrders =
              row.assignments === null
                ? []
                : row.assignments.workOrders
                    .map((item) => {
                      return item.name;
                    })
                    .join(",");
            const workShifts =
              row.assignments === null
                ? []
                : row.assignments.workShifts
                    .map((item) => {
                      return item.name;
                    })
                    .join(",");
            const assignment_id = row.assignments === null ? null : row.assignments._id;
            return {
              id: index + 1,
              assignment_id: assignment_id,
              name: row.name,
              employee_id: row?._id ?? "",
              workOrders: workOrders,
              workShifts: workShifts,
            };
          })
        );
      } else {
        toast.warn(result.message);
      }
    };
    const getWorkShifts = async () => {
      try {
        const response = await service.getWorkShifts();
        if (response.status) {
          setWorkShifts(response.data);
        } else {
          toast.warn(response.message);
        }
      } catch (err) {
        toast.warn(err.message);
        console.log(err);
      }
    };
    const getWorkOrders = async () => {
      try {
        const response = await service.getWorkOrders();
        if (response.status) {
          setWorkOrders(response.data);
        } else {
          toast.warn(response.message);
        }
      } catch (err) {
        toast.warn(err.message);
        console.log(err);
      }
    };
    getWorkShifts();
    getWorkOrders();
    getRows();
  }, []);
  return (
    <div>
      {isAssignDialogOpen && (
        <AssignDialog
          isAssignDialogOpen={isAssignDialogOpen}
          onAssignDialogClose={handleAssignDialogClose}
          onAssignDialogSubmit={handleAssignDialogSubmit}
          selectedEmployee={selectedEmployee}
        />
      )}
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
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
            overflowX: "scroll",
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
      </div>
    </div>
  );
}
