import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddEmployeeDialog = ({ isAddDialogOpen, onAddDialogClose, onAddDialogSubmit }) => {
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [selectedPaidPeriod, setSelectedPaidPeriod] = useState("");
  const [pin, setPin] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [selectedPeriodDate, setSelectedPeriodDate] = useState(0);
  const [selectedPeriodDatePicker, setSelectedPeriodDatePicker] = useState(null);
  const [payDay, setPayDay] = useState(0);
  const handlePaidPeriodChange = (event) => {
    setSelectedPaidPeriod(event.target.value);
  };
  const handlePaidPeriodDateChange = (event) => {
    setSelectedPeriodDate(event.target.value);
    setPayDay(event.target.value);
  };
  const handlePaidPeriodDatePickerChange = (event) => {
    setSelectedPeriodDatePicker(event);
    setPayDay(event.date());
  };
  return (
    <Dialog open={isAddDialogOpen} onClose={onAddDialogClose}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
        />
        <TextField autoFocus margin="dense" id="pin" label="Pin" type="number" fullWidth value={pin} onChange={(e) => setPin(e.target.value)} />
        {/* <FormControlLabel
          sx={{
            display: "block",
          }}
          control={<Switch checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} name="isAdmin" color="primary" />}
          label="Admin"
        /> */}
        <FormControlLabel
          sx={{
            display: "block",
          }}
          control={<Switch checked={isManager} onChange={() => setIsManager(!isManager)} name="isManager" color="primary" />}
          label="Manager"
        />
        <FormControl fullWidth>
          <InputLabel className="mt-4" id="paidperiod-label">
            Paid Period
          </InputLabel>
          <Select
            className="mt-4"
            labelId="paidperiod-label"
            id="paidperiod-select"
            value={selectedPaidPeriod}
            input={<OutlinedInput label="Tag" />}
            label="PaidPeriod"
            onChange={handlePaidPeriodChange}
          >
            <MenuItem value={"weekly"}>Weekly</MenuItem>
            <MenuItem value={"biweekly"}>Bi-Weekly</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
          </Select>
        </FormControl>
        {(selectedPaidPeriod === "weekly" || selectedPaidPeriod === "biweekly") && (
          <FormControl fullWidth>
            <Select
              className="mt-4"
              value={selectedPeriodDate}
              onChange={handlePaidPeriodDateChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((item, index) => {
                return (
                  <MenuItem key={index} value={index + 1}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        {selectedPaidPeriod === "monthly" && (
          <div className="mt-4">
            <DatePicker label={"Pay Day"} views={["day"]} value={selectedPeriodDatePicker} onChange={handlePaidPeriodDatePickerChange} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onAddDialogClose();
            setNewEmployeeName("");
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (newEmployeeName === "" || pin === "") {
              toast.error("Please fill in all fields");
              return;
            }
            onAddDialogSubmit(newEmployeeName, pin, isAdmin, isManager, selectedPaidPeriod, payDay);
            setNewEmployeeName("");
            setPin("");
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;
