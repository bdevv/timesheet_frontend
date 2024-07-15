import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import auth from "../../api/auth";
import service from "../../api/service";

import DialPadComponent from "../../components/dialpad/dialpad";
import BreakingIcon from "../../components/icons/breaking";
import LunchIcon from "../../components/icons/lunch";
import HomeIcon from "../../components/icons/home";
import PrivateMessagesDialog from "../../components/dialog/privatemessagesdialog";
import { useDispatch } from "react-redux";
import { activeTab, setEmployeeId, setIsManager, setName, setToken } from "../../redux/authslice";
import WorkingIcon from "../../components/icons/working";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" to="https://pastiansbakery.com/">
        PastiansBakery
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CheckPin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const [selectedType, setSelectedType] = useState("");
  const [breakingTypes, setBreakingTypes] = useState([]);
  const [breakingTypeName, setBreakingTypeName] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const handlePinInput = async (value) => {
    if (value === "⌫") {
      handleBackspace();
    } else {
      if (pin.length < 4) {
        if (pin.length === 3) {
          const response = await auth.checkPin(name, pin + value);
          dispatch(setName(response.name));
          dispatch(setToken(response.accessToken));
          dispatch(setIsManager(response.isManager));
          dispatch(setEmployeeId(response.employee_id));
          if (response.status === true) {
            if (response.name === "admin") {
              dispatch(activeTab(2));
              navigate("/dashboard");
              return;
            } else dispatch(activeTab(1));
            setShowDialog(true);
            if (selectedType === "clockin") {
              try {
                const response = await auth.clockIn(name);
                if (response.status === true) {
                  toast.success("Thank you for Clocking-In");
                } else toast.warn(response.message);
              } catch (e) {
                toast.warn(e.message);
              }
            } else if (selectedType === "clockout") {
              try {
                const response = await auth.clockOut(name);
                if (response.status === true) {
                  toast.success("Thank you for Clocking-Out");
                } else toast.warn(response.message);
              } catch (e) {
                toast.warn(e.message);
              }
            } else if (selectedType === "breakin") {
              try {
                const breakId = breakingTypes.find((b) => b.name === breakingTypeName)._id;
                const response = await auth.breakIn(name, breakId);
                if (response.status === true) {
                  toast.success("Thank you for Breaking-In");
                } else toast.warn(response.message);
              } catch (e) {
                toast.warn(e.message);
              }
            } else if (selectedType === "breakout") {
              try {
                const response = await auth.breakOut(name);
                if (response.status === true) {
                  toast.success("Thank you for Breaking-Out");
                } else toast.warn(response.message);
              } catch (e) {
                toast.warn(e.message);
              }
            }
          } else {
            setShake(true); // Trigger the shake animation
          }
        }
        setPin(pin + value);
      } else if (pin.length === 4) {
        setPin("");
      }
    }
  };
  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };
  useEffect(() => {
    if (shake) {
      // Remove the shake class after the animation ends
      const timer = setTimeout(() => {
        setPin("");
        setShake(false);
      }, 1000); // Adjust the duration as needed
      return () => clearTimeout(timer);
    }
  }, [shake]);
  const handleCloseDialog = () => {
    setShowDialog(false);
    if (type === "dashboard") navigate("/dashboard");
    else navigate("/");
  };

  const getBreakingTypes = async () => {
    const result = await service.getBreaks();
    if (result.status === true) {
      setBreakingTypes(result.data);
    } else {
      toast.warn(result.message);
    }
  };
  useEffect(() => {
    getBreakingTypes();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      {showDialog && <PrivateMessagesDialog isOpen={showDialog} onDialogClose={handleCloseDialog}></PrivateMessagesDialog>}
      <Grid container component="main" sx={{ height: "100vh" }} overflow={"auto"}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(images/login.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: { xs: "15vh", sm: "100vh" },
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            height: { xs: "full", sm: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
          }}
        >
          <Box
            sx={{
              mt: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="flex flex-col w-full h-full text-center items-center justify-center">
              <img src="images/avatar.svg" alt="logo" className="w-16 h-16" />
              <h1 className="sm:block text-3xl font-bold">Hello {name}!</h1>
              {type !== "dashboard" && (
                <div className="flex  w-[400px] border bg-slate-200 rounded-lg overflow-y-auto text-left p-4 gap-2 mt-4 justify-between">
                  <div
                    className={`w-[75px] h-[75px] border-2 border-slate-300 flex flex-col ${
                      selectedType === "clockin" ? "outline outline-4 outline-offset-2 outline-blue-500  bg-red-500" : " bg-blue-500"
                    } hover:bg-blue-300 text-white rounded-xl  items-center justify-center gap-2 p-1 cursor-pointer`}
                    onClick={() => setSelectedType("clockin")}
                  >
                    <WorkingIcon color={"#fcf0f1"} width={25} height={25} />
                    <span className="text-[12px]">Clock In</span>
                  </div>
                  <div
                    className={`w-[75px] h-[75px] border-2 border-slate-300 flex flex-col ${
                      selectedType === "clockout" ? "outline outline-4 outline-offset-2 outline-blue-500  bg-red-500" : " bg-blue-500"
                    } hover:bg-blue-300 text-white rounded-xl  items-center justify-center gap-2 p-1  cursor-pointer`}
                    onClick={() => setSelectedType("clockout")}
                  >
                    <WorkingIcon color={"#fcf9e8"} width={25} height={25} />
                    <span className="text-[12px]">Clock Out</span>
                  </div>
                  <div
                    className={`w-[75px] h-[75px] border-2 border-slate-300 flex flex-col ${
                      selectedType === "breakin" ? "outline outline-4 outline-offset-2 outline-blue-500  bg-red-500" : " bg-blue-500"
                    } hover:bg-blue-300 text-white rounded-xl  items-center justify-center gap-2 p-1 cursor-pointer`}
                    onClick={() => setSelectedType("breakin")}
                  >
                    <HomeIcon color={"#edfaef"} width={25} height={25} />
                    <span className="text-[12px]">Break In</span>
                  </div>
                  <div
                    className={`w-[75px] h-[75px] border-2 border-slate-300 flex flex-col ${
                      selectedType === "breakout" ? "outline outline-4 outline-offset-2 outline-blue-500  bg-red-500" : " bg-blue-500"
                    } hover:bg-blue-300 text-white rounded-xl  items-center justify-center gap-2 p-1 cursor-pointer`}
                    onClick={() => setSelectedType("breakout")}
                  >
                    <HomeIcon color={"#edfaef"} width={25} height={25} />
                    <span className="text-[12px]">Break Out</span>
                  </div>
                </div>
              )}
              {selectedType === "breakin" && (
                <div className="flex w-[400px] items-center justify-center flex-wrap gap-4 mt-4 bg-yellow-100 rounded-lg p-4">
                  {breakingTypes.map((breakType) => (
                    <div
                      className={`w-[80px] h-[40px] flex flex-col ${
                        breakingTypeName === breakType.name ? "bg-red-500 outline outline-2 outline-offset-2 outline-gray-500" : "bg-green-500"
                      }  hover:bg-red-300 text-white rounded-xl shadow-lg items-center justify-center  cursor-pointer`}
                      onClick={() => setBreakingTypeName(breakType.name)}
                    >
                      <span className="text-[12px]">{breakType.name}</span>
                    </div>
                  ))}
                </div>
              )}
              {(selectedType === "clockout" ||
                selectedType === "clockin" ||
                selectedType === "breakout" ||
                type === "dashboard" ||
                breakingTypeName !== "") && (
                <>
                  <h5 className="mt-4">Please enter your PIN:</h5>
                  <div className={`flex justify-center mt-8 bg-slate-200 bg-opacity-70 rounded-xl shadow-md ${shake ? "shake" : ""}`}>
                    {Array.from({ length: 4 }, (_, index) => (
                      <input
                        key={index}
                        type="password"
                        value={pin[index] || ""}
                        readOnly
                        className="text-center w-12 mx-2 my-4 py-2 border border-gray-400 rounded"
                      />
                    ))}
                  </div>
                  <div className="flex justify-center mt-8 bg-slate-200 bg-opacity-70 rounded-xl  shadow-md p-4">
                    <DialPadComponent handleInput={handlePinInput} />
                  </div>
                </>
              )}
            </div>

            <Copyright sx={{ mt: 5, mb: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
