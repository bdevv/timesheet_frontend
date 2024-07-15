import { CheckCircle, Close, Home, People, Person, ViewList, Warning } from "@mui/icons-material";
import { AppBar, Box, Button, Chip, Dialog, DialogContent, IconButton, MenuItem, Select, TextField, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import service from "../../api/service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const AddMessageDialog = ({ isAddDialogOpen, onAddDialogClose, onAddDialogSubmit }) => {
  const isManager = useSelector((state) => state.tab.isManager);
  const manager_id = useSelector((state) => state.tab.employee_id);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
  const [workShifts, setWorkShifts] = useState([]);
  const [workShiftsData, setWorkShiftsData] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [workOrdersData, setWorkOrdersData] = useState([]);
  const [type, setType] = useState("Normal");
  const [to, setTo] = useState(isManager ? "Employees" : "All");
  const handleEmployeeChange = (event) => {
    const {
      target: { value },
    } = event;
    setWorkOrders([]);
    setWorkShifts([]);
    setEmployees(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleWorkShiftChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmployees([]);
    setWorkOrders([]);
    setWorkShifts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleWorkOrderChange = (event) => {
    const {
      target: { value },
    } = event;
    setEmployees([]);
    setWorkShifts([]);
    setWorkOrders(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const getEmployees = async () => {
    try {
      const response = await service.getEmployees();
      if (response.status) {
        setEmployeesData(response.data);
      } else {
        toast.warn(response.message);
      }
    } catch (err) {
      toast.warn(err.message);
      console.log(err);
    }
  };
  const getEmployeesByManager = async (manager_id) => {
    try {
      const response = await service.getEmployeesByManager(manager_id);
      if (response.status) {
        setEmployeesData(response.data);
      } else {
        toast.warn(response.message);
      }
    } catch (err) {
      toast.warn(err.message);
      console.log(err);
    }
  };
  const getWorkShifts = async () => {
    try {
      const response = await service.getWorkShifts();
      if (response.status) {
        setWorkShiftsData(response.data);
      } else {
        toast.warn(response.message);
      }
    } catch (err) {
      toast.warn(err.message);
    }
  };
  const getWorkOrders = async () => {
    try {
      const response = await service.getWorkOrders();
      if (response.status) {
        setWorkOrdersData(response.data);
      } else {
        toast.warn(response.message);
      }
    } catch (err) {
      toast.warn(err.message);
    }
  };
  useEffect(() => {
    getWorkShifts();
    getWorkOrders();
  }, []);
  useEffect(() => {
    if (isManager) getEmployeesByManager(manager_id);
    else getEmployees();
  }, [manager_id, isManager]);
  return (
    <Dialog open={isAddDialogOpen} onClose={onAddDialogClose} fullScreen>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onAddDialogClose} aria-label="close">
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            New Message
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => {
              onAddDialogSubmit(to, employees, workShifts, workOrders, subject, type, content);
            }}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container spacing={2} className="items-center">
          <Grid xs={2}>
            <Typography variant="type" sx={{ mr: 2 }} width={100}>
              To:
            </Typography>
          </Grid>
          <Grid xs={10}>
            {isManager && (
              <Select className="w-full" id="typeselect" value={to} onChange={handleChangeTo}>
                <MenuItem value={"Employees"}>
                  <People color="primary"></People> Employees
                </MenuItem>
              </Select>
            )}
            {!isManager && (
              <Select className="w-full" id="typeselect" value={to} onChange={handleChangeTo}>
                <MenuItem value={"All"}>
                  <People color="primary"></People> All Employees
                </MenuItem>
                <MenuItem value={"Employees"}>
                  <People color="primary"></People> Employees
                </MenuItem>
                <MenuItem value={"WorkShift"}>
                  <Person color="primary"></Person> Work Shift
                </MenuItem>
                <MenuItem value={"WorkOrder"}>
                  <ViewList color="primary"></ViewList> Work Order
                </MenuItem>
                <MenuItem value={"Home"}>
                  <Home color="primary"></Home> Home Screen
                </MenuItem>
              </Select>
            )}
          </Grid>
          <Grid xs={2}>
            <Typography variant="employees" sx={{ mr: 2 }} width={100}>
              Recipients:
            </Typography>
          </Grid>
          <Grid xs={10}>
            {to === "All" ? (
              <Select
                className="w-full mt-4"
                id="employee-select"
                multiple
                value={employeesData.map((item) => item._id)}
                disabled
                // input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  const selectedNames = selected.map((value) => {
                    // Find the corresponding item name for the selected value
                    const item = employeesData.find((item) => item._id === value);
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
                onChange={handleEmployeeChange}
              >
                {employeesData.map((item, index) => {
                  return (
                    <MenuItem value={item._id} key={index}>
                      <Person color="primary"></Person>
                      {"  " + item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            ) : to === "Employees" ? (
              <Select
                className="w-full mt-4"
                id="employee-select"
                multiple
                value={employees}
                // input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  const selectedNames = selected.map((value) => {
                    // Find the corresponding item name for the selected value
                    const item = employeesData.find((item) => item._id === value);
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
                onChange={handleEmployeeChange}
              >
                {employeesData.map((item, index) => {
                  return (
                    <MenuItem value={item._id} key={index}>
                      <Person color="primary"></Person>
                      {"  " + item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            ) : to === "WorkShift" ? (
              <Select
                className="w-full mt-4"
                id="workshift-select"
                multiple
                value={workShifts}
                // input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  const selectedNames = selected.map((value) => {
                    // Find the corresponding item name for the selected value
                    const item = workShiftsData.find((item) => item._id === value);
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
                onChange={handleWorkShiftChange}
              >
                {workShiftsData.map((item, index) => {
                  return (
                    <MenuItem value={item._id} key={index}>
                      <Person color="primary"></Person>
                      {"  " + item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            ) : to === "WorkOrder" ? (
              <Select
                className="w-full mt-4"
                id="workOrder-select"
                multiple
                value={workOrders}
                // input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => {
                  const selectedNames = selected.map((value) => {
                    // Find the corresponding item name for the selected value
                    const item = workOrdersData.find((item) => item._id === value);
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
                onChange={handleWorkOrderChange}
              >
                {workOrdersData.map((item, index) => {
                  return (
                    <MenuItem value={item._id} key={index}>
                      <Person color="primary"></Person>
                      {"  " + item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            ) : null}
          </Grid>
          <Grid xs={2}>
            <Typography variant="subject" sx={{ mr: 2 }} width={100}>
              Subject:
            </Typography>
          </Grid>
          <Grid xs={10}>
            <TextField autoFocus margin="dense" id="subject" type="text" fullWidth value={subject} onChange={(e) => setSubject(e.target.value)} />
          </Grid>
          <Grid xs={2}>
            <Typography variant="type" sx={{ mr: 2 }} width={100}>
              Type:
            </Typography>
          </Grid>
          <Grid xs={10}>
            <Select className="w-full" id="typeselect" value={type} onChange={handleChangeType}>
              <MenuItem value={"Normal"}>
                <CheckCircle color="success"></CheckCircle>Normal
              </MenuItem>
              <MenuItem value={"Important"}>
                <Warning color="warning"></Warning>Important
              </MenuItem>
            </Select>
          </Grid>
          <Grid xs={2} className="items-center">
            <Typography variant="content" sx={{ mr: 2 }} width={100}>
              Content:
            </Typography>
          </Grid>
          <Grid xs={10}>
            <TextField
              className="w-full h-full"
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              defaultValue=""
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddMessageDialog;
