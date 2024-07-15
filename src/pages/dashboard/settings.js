import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import auth from "../../api/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Settings = () => {
  const employee_id = useSelector((state) => state.tab.employee_id);

  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleUpdatePin = async () => {
    const response = await auth.updatePin(employee_id, pin);
    if (response.status === true) {
      toast.success(response.message);
    } else {
      toast.warn(response.message);
    }
  };
  useEffect(() => {
    const getPin = async () => {
      const response = await auth.getPin(employee_id);
      if (response.status === true) {
        const pin = response.pin;
        setPin(pin);
      } else {
        toast.warn(response.message);
      }
    };
    getPin();
  }, [employee_id]);
  return (
    <div className="flex flex-col w-full h-full p-4 items-center justify-center ">
      <div className="flex w-[300px] h-[550px] rounded-xl border border-solid bg-white shadow-lg">
        <div className="flex flex-col items-center justify-start w-full p-4">
          <img src="/images/changepin.png" width={200} height={200} alt={"changepin"}></img>
          <form className="flex flex-col gap-4 items-center space-x-4 mt-8">
            <label htmlFor="pin" className="font-medium">
              Please enter your pin:
            </label>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="pinInput">Pin</InputLabel>
              <OutlinedInput
                id="pinInput"
                type={showPassword ? "text" : "password"}
                inputProps={{ maxLength: 4, inputMode: "numeric", pattern: "[0-9]*" }}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Pin"
              />
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleUpdatePin}>
              Change
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
