import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./router/privateroutes";
import Main from "./pages/dashboard/main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./pages/dashboard/homescreen";
import CheckPin from "./pages/dashboard/checkpin";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ textAlign: "left" }}
      />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Main />} path="/dashboard" exact />
            </Route>
            <Route element={<HomeScreen />} path="/" />
            <Route element={<CheckPin />} path="/checkpin" />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}
export default App;
