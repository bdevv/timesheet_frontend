import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const AddBreakDialog = ({ isAddDialogOpen, onAddDialogClose, onAddDialogSubmit }) => {
  const [newBreakName, setNewBreakName] = useState("");
  const [newIsPaid, setNewIsPaid] = useState(true);
  const [limit, setLimit] = useState(0);
  return (
    <Dialog open={isAddDialogOpen} onClose={onAddDialogClose}>
      <DialogTitle>Add Break</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined">
          <Typography>Name</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            value={newBreakName}
            onChange={(e) => setNewBreakName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <Typography>Limit</Typography>
          <OutlinedInput
            id="outlined-adornment-mins"
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
            inputProps={{
              "aria-label": "mins",
            }}
          />
        </FormControl>
        <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
          <Checkbox checked={newIsPaid} onChange={(e) => setNewIsPaid(e.target.checked)} />
          <label htmlFor="paid-checkbox" style={{ marginLeft: "8px" }}>
            Paid
          </label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onAddDialogClose();
            setNewBreakName("");
            setLimit(0);
            setNewIsPaid(true);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAddDialogSubmit(newBreakName, limit, newIsPaid);
            setNewBreakName("");
            setLimit(0);
            setNewIsPaid(true);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBreakDialog;
