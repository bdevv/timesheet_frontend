import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const AddWorkOrderDialog = ({
  isAddDialogOpen,
  onAddDialogClose,
  onAddDialogSubmit,
}) => {
  const [newWorkOrderName, setNewWorkOrderName] = useState("");
  return (
    <Dialog open={isAddDialogOpen} onClose={onAddDialogClose}>
      <DialogTitle>Add WorkOrder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={newWorkOrderName}
          onChange={(e) => setNewWorkOrderName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onAddDialogClose();
            setNewWorkOrderName("");
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAddDialogSubmit(newWorkOrderName);
            setNewWorkOrderName("");
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWorkOrderDialog;
