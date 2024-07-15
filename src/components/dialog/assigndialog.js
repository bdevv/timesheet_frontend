import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import service from "../../api/service";
import { toast } from "react-toastify";

const AssignDialog = ({ isAssignDialogOpen, onAssignDialogClose, onAssignDialogSubmit, selectedEmployee }) => {
  const [selectedWorkShifts, setSelectedWorkShifts] = useState([]);
  const [selectedWorkOrders, setSelectedWorkOrders] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [workShifts, setWorkShifts] = useState([]);
  const handleWorkOrderChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWorkOrders(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleWorkShiftChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWorkShifts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
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
  }, []);
  console.log(workOrders);
  return (
    <Dialog open={isAssignDialogOpen} onClose={onAssignDialogClose} maxWidth="md" fullWidth>
      <DialogTitle>Assignment</DialogTitle>
      <DialogContent>
        <div className="p-4">
          <FormControl fullWidth>
            <InputLabel id="workorder-label">Work Order</InputLabel>
            <Select
              labelId="workorder-label"
              id="workorder-select"
              multiple
              value={selectedWorkOrders}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => {
                const selectedNames = selected.map((value) => {
                  // Find the corresponding item name for the selected value
                  const item = workOrders.find((item) => item._id === value);
                  return item ? item.name : "";
                });
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selectedNames.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                );
              }}
              label="WorkasdasdasdOrder"
              onChange={handleWorkOrderChange}
            >
              {workOrders.map((item, index) => {
                return (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div className="mt-4">
            <FormControl fullWidth>
              <InputLabel id="workshift-label">Work Shift</InputLabel>
              <Select
                labelId="workshift-label"
                id="workshift-select"
                value={selectedWorkShifts}
                multiple
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  const selectedNames = selected.map((value) => {
                    // Find the corresponding item name for the selected value
                    const item = workShifts.find((item) => item._id === value);
                    return item ? item.name : "";
                  });
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedNames.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }}
                label="WorkShift"
                onChange={handleWorkShiftChange}
              >
                {workShifts.map((item, index) => {
                  return (
                    <MenuItem value={item._id} key={index}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onAssignDialogClose();
            setSelectedWorkShifts([]);
            setSelectedWorkOrders([]);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAssignDialogSubmit(selectedEmployee, selectedWorkOrders, selectedWorkShifts);
            setSelectedWorkShifts([]);
            setSelectedWorkOrders([]);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignDialog;
