import { CheckCircle, Close, Home, People, Person, ViewList, Warning } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
const TimeSheetDialog = ({ isAddDialogOpen, onAddDialogClose, onAddDialogSubmit }) => {
  useEffect(() => {}, []);
  return (
    <Dialog open={isAddDialogOpen} onClose={onAddDialogClose} fullScreen>
      <DialogTitle>Change Time Sheet</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} className="items-center">
          <Grid xs={2}>
            <Typography variant="subject" sx={{ mr: 2 }} width={100}>
              Time:
            </Typography>
          </Grid>
          <Grid xs={10}>
            <TimePicker label="PinTime" value={startTimeObj} onChange={handleStartTimeChange} />
          </Grid>

          <Grid xs={2} className="items-center">
            <Typography variant="description" sx={{ mr: 2 }} width={100}>
              Description:
            </Typography>
          </Grid>
          <Grid xs={10}>
            <TextField
              className="w-full h-full"
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              defaultValue=""
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TimeSheetDialog;
