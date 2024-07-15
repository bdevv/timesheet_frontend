import axios from "axios";
import { API_URL } from "../config/config";

const updateBreak = async (row) => {
  try {
    const res = await axios.post(API_URL + "/updateBreak", {
      ...row,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getBreaks = async () => {
  try {
    const res = await axios.get(API_URL + "/getBreaks", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const deleteBreak = async (id) => {
  try {
    const res = await axios.post(API_URL + "/deleteBreak", {
      id: id,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const updateWorkOrder = async (row) => {
  try {
    const res = await axios.post(API_URL + "/updateWorkOrder", {
      ...row,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getWorkOrders = async () => {
  try {
    const res = await axios.get(API_URL + "/getWorkOrders", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const deleteWorkOrder = async (id) => {
  try {
    const res = await axios.post(API_URL + "/deleteWorkOrder", {
      id,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const addWorkShift = async (name, startTime, endTime) => {
  try {
    const res = await axios.post(API_URL + "/addWorkShift", {
      name,
      startTime,
      endTime,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const updateWorkShift = async (row) => {
  try {
    const res = await axios.post(API_URL + "/updateWorkShift", {
      ...row,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getWorkShifts = async () => {
  try {
    const res = await axios.get(API_URL + "/getWorkShifts", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const deleteWorkShift = async (name) => {
  try {
    const res = await axios.post(API_URL + "/deleteWorkShift", {
      name: name,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const addEmployee = async (name, pin, isAdmin, isManager, payType, payDay) => {
  try {
    const res = await axios.post(API_URL + "/addEmployee", {
      name,
      pin,
      isAdmin,
      isManager,
      payType,
      payDay,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getEmployees = async () => {
  try {
    const res = await axios.get(API_URL + "/getEmployees", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const updateEmployee = async (row) => {
  try {
    const res = await axios.post(API_URL + "/updateEmployee", {
      ...row,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getEmployeesByManager = async (manager_id) => {
  try {
    const res = await axios.get(API_URL + "/getEmployeesByManager?manager_id=" + manager_id, {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const deleteEmployee = async (id) => {
  try {
    const res = await axios.post(API_URL + "/deleteEmployee", {
      id: id,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getAssignments = async () => {
  try {
    const res = await axios.get(API_URL + "/getAssignments", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const addAssignment = async (employee_id, workOrders, workShifts) => {
  try {
    const res = await axios.post(API_URL + "/addAssignment", {
      employee_id,
      workOrders,
      workShifts,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getEmployeeStatus = async () => {
  try {
    const res = await axios.get(API_URL + "/getEmployeeStatus", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const getCurrentTime = async () => {
  try {
    const res = await axios.get(API_URL + "/getCurrentTime", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const getClockInOutByEmployee = async (employee_id) => {
  try {
    const res = await axios.get(API_URL + "/getClockInOutByEmployee?employee_id=" + employee_id, {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const getAllTimeSheets = async (currentDate) => {
  try {
    const res = await axios.get(API_URL + "/getAllTimeSheets?currentDate=" + currentDate, {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const getAllByEmployee = async (employee_id, todayDate) => {
  try {
    const res = await axios.get(API_URL + "/getAllByEmployee?employee_id=" + employee_id + "&todayDate=" + todayDate, {});
    return res.data;
  } catch (err) {
    return err;
  }
};

const addMessage = async (employee_id, to, employees, workShifts, workOrders, subject, type, message) => {
  try {
    const res = await axios.post(API_URL + "/addMessage", { employee_id, to, employees, workShifts, workOrders, subject, type, message });
    return res.data;
  } catch (err) {
    return err;
  }
};
const getMessages = async (employee_id) => {
  try {
    const res = await axios.get(API_URL + "/getMessages?employee_id=" + employee_id, {});
    console.log(res);
    return res.data;
  } catch (err) {
    return err;
  }
};
const getMessagesByEmployee = async (employee_id) => {
  try {
    const res = await axios.get(API_URL + "/getMessagesByEmployee?employee_id=" + employee_id, {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const getPublicMessages = async () => {
  try {
    const res = await axios.get(API_URL + "/getPublicMessages", {});
    return res.data;
  } catch (err) {
    return err;
  }
};
const markAsRead = async (id, employee_id) => {
  try {
    const res = await axios.post(API_URL + "/markAsRead", {
      id,
      employee_id,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const deleteMessage = async (id) => {
  try {
    const res = await axios.post(API_URL + "/deleteMessage", {
      id,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const updateTimeSheet = async (row, employee_id) => {
  try {
    const res = await axios.post(API_URL + "/updateTimeSheet", {
      row,
      employee_id,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
const deleteTimeSheet = async (id) => {
  try {
    const res = await axios.post(API_URL + "/deleteTimeSheet", {
      id,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

// eslint-disable-next-line
export default {
  updateBreak,
  getBreaks,
  deleteBreak,

  updateWorkOrder,
  getWorkOrders,
  deleteWorkOrder,

  addWorkShift,
  updateWorkShift,
  getWorkShifts,
  deleteWorkShift,

  addEmployee,
  updateEmployee,
  getEmployees,
  getEmployeesByManager,
  deleteEmployee,

  getAssignments,
  addAssignment,

  getEmployeeStatus,
  getCurrentTime,
  getClockInOutByEmployee,
  getAllTimeSheets,
  getAllByEmployee,

  addMessage,
  getMessages,
  getMessagesByEmployee,
  getPublicMessages,
  deleteMessage,

  markAsRead,

  updateTimeSheet,
  updateTimeSheet,
  deleteTimeSheet,
};
