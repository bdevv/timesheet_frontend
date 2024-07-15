import axios from "axios";
import { API_URL } from "../config/config";

const checkPin = async (name, pin) => {
  try {
    const res = await axios.post(API_URL + "/checkPin", {
      name,
      pin,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getPin = async (employee_id) => {
  try {
    const res = await axios.get(API_URL + "/getPin?employee_id=" + employee_id, {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const updatePin = async (employee_id, newPin) => {
  try {
    const res = await axios.post(API_URL + "/updatePin", { employee_id: employee_id, newPin: newPin });
    return res.data;
  } catch (err) {
    return err;
  }
};
const clockIn = async (name) => {
  try {
    const res = await axios.post(
      API_URL + "/clockIn",
      {
        name,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
const clockOut = async (name, breakName, breakingTypeName) => {
  try {
    const res = await axios.post(
      API_URL + "/clockOut",
      {
        name,
        breakName,
        breakingTypeName,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
const breakIn = async (name, breakId) => {
  try {
    const res = await axios.post(
      API_URL + "/breakIn",
      {
        name,
        breakId,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
const breakOut = async (name, breakName, breakingTypeName) => {
  try {
    const res = await axios.post(
      API_URL + "/breakOut",
      {
        name,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
export default { checkPin, clockIn, clockOut, getPin, updatePin, breakIn, breakOut };
