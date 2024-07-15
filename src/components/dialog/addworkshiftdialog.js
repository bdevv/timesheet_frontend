import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddWorkShiftDialog = ({ isAddDialogOpen, onAddDialogClose, onAddDialogSubmit }) => {
  const [newWorkShiftName, setNewWorkShiftName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeObj, setStartTimeObj] = useState(null);
  const [endTimeObj, setEndTimeObj] = useState(null);
  const handleStartTimeChange = (newValue) => {
    if (newValue) {
      const hours = newValue.get("hour");
      const minutes = newValue.get("minute");
      const seconds = newValue.get("second");

      // Do something with the time

      setStartTime(hours + ":" + minutes + ":" + seconds);
      setStartTimeObj(newValue);
    } else {
      setStartTime(null);
      setStartTimeObj(null);
    }
  };
  const handleEndTimeChange = (newValue) => {
    if (newValue) {
      const hours = newValue.get("hour");
      const minutes = newValue.get("minute");
      const seconds = newValue.get("second");

      // Do something with the time

      setEndTime(hours + ":" + minutes + ":" + seconds);
      setEndTimeObj(newValue);
    } else {
      setEndTime(null);
      setEndTimeObj(null);
    }
  };
  return (
    <Dialog open={isAddDialogOpen} onClose={onAddDialogClose}>
      <DialogTitle>Add WorkShift</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={newWorkShiftName}
          onChange={(e) => setNewWorkShiftName(e.target.value)}
        />
        <TimePicker label="start time" value={startTimeObj} onChange={handleStartTimeChange} />
        <TimePicker label="end time" value={endTimeObj} onChange={handleEndTimeChange} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onAddDialogClose();
            setNewWorkShiftName("");
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (newWorkShiftName === "" || startTime === null || endTime === null) {
              toast.error("Please fill in all fields");
              return;
            }
            onAddDialogSubmit(newWorkShiftName, startTime, endTime);
            setNewWorkShiftName("");
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWorkShiftDialog;
