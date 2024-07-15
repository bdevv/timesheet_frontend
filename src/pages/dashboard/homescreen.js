import React, { useEffect, useState } from "react";
import HomeAppBar from "../../components/appbar/homeappbar";
import WorkingIcon from "../../components/icons/working";
import Clock from "../../components/digitalclock/Clock/Clock";
import { Alert, AlertTitle } from "@mui/material";
import { AccessTime, KeyboardArrowDown, LabelOutlined, People, RocketLaunch, ViewList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import service from "../../api/service";
import { toast } from "react-toastify";
import BreakingIcon from "../../components/icons/breaking";
import HomeIcon from "../../components/icons/home";
import moment from "moment";
const HomeScreen = () => {
  const navigate = useNavigate();
  const [employeeStatus, setEmployeeStatus] = useState([]);
  const [employeeCounts, setEmployeeCounts] = useState({ Working: 0, Break: 0, Home: 0 });
  const [messages, setMessages] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const handleCheckPin = (name, type) => {
    navigate("/checkpin?name=" + name + "&type=" + type);
  };
  const handleDashboard = (name) => {
    navigate("/checkpin?name=" + name + "&type=dashboard");
  };
  const handleFilterChange = (employeeName) => {
    if (employeeName !== "") setFilteredEmployees(employeeStatus.filter((item) => item.name.toLowerCase().includes(employeeName.toLowerCase())));
    else setFilteredEmployees(employeeStatus.filter((item) => item.isAssigned === true));
  };
  const getEmployeeStatus = async () => {
    try {
      const response = await service.getEmployeeStatus();
      if (response.status === true) {
        const datas = response.data.map((item) => {
          const workOrder_names = item.assignment === null ? "" : item.assignment.workOrders.map((workOrder) => workOrder.name).join(", ");
          let status = "";
          let breakingName = "";
          if (item.clockInTimeStamp !== null && item.clockInTimeStamp !== undefined) {
            if (item.clockOutTimeStamp === null || item.clockOutTimeStamp === undefined) {
              const lastBreakItem = item.breaks[item.breaks.length - 1];
              if (lastBreakItem) {
                if (lastBreakItem.breakInTimeStamp !== null && lastBreakItem.breakInTimeStamp !== undefined) {
                  if (lastBreakItem.breakOutTimeStamp !== null && lastBreakItem.breakOutTimeStamp !== undefined) {
                    status = "Working";
                  } else {
                    status = "Breaking";
                    breakingName = lastBreakItem.break_id.name;
                  }
                }
              } else {
                status = "Working";
              }
            } else {
              status = "Home";
            }
          } else {
            status = "Home";
          }
          return {
            name: item?.name ?? "",
            workorder: workOrder_names,
            status: status,
            breakingName: breakingName,
            isAssigned: item?.isAssigned,
          };
        });
        setFilteredEmployees(datas.filter((item) => item.isAssigned === true));
        setEmployeeStatus(datas);
        const workingCount = datas.filter((item) => item.status === "Working").length;
        const homeCount = datas.filter((item) => item.status === "Home").length;
        const breakingCount = datas.filter((item) => item.status === "Breaking").length;
        setEmployeeCounts({ Working: workingCount, Home: homeCount, Break: breakingCount });
      } else toast.warn(response.message);
    } catch (err) {
      toast.warn(err.message);
    }
  };
  const getMessages = async () => {
    try {
      const response = await service.getPublicMessages();
      if (response.status === true) {
        setMessages(response.data);
      } else toast.warn(response.message);
    } catch (err) {
      toast.warn(err.message);
    }
  };
  useEffect(() => {
    getEmployeeStatus();
    getMessages();
  }, []);
  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <HomeAppBar onChangeFilter={handleFilterChange} messages={messages} />
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 p-4 gap-4">
        <div className="w-full h-[300px] sm:h-full rounded-lg overflow-y-auto">
          <div className="relative flex items-center justify-center">
            <p className="text-3xl font-bold mb-4">TimeSheet</p>
            <div className="absolute right-0">
              <a href="/checkpin?name=admin&type=dashboard" className="text-blue-600 hover:underline">
                Admin
              </a>
            </div>
          </div>
          <div className="homescreen-table-container w-full text-[12px]">
            <table className="w-full border  text-[12px]">
              <thead>
                <tr>
                  <th>
                    <div className="flex items-center justify-between">
                      <div>
                        <People color="primary" />
                        <span className="ml-1 text-nowrap">User</span>
                      </div>
                      <KeyboardArrowDown color="primary" />
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center justify-between">
                      <div>
                        <ViewList color="primary" />
                        <span className="ml-1">Order</span>
                      </div>
                      <KeyboardArrowDown color="primary" />
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center justify-between">
                      <div>
                        <LabelOutlined color="primary" />
                        <span className="ml-1">Status</span>
                      </div>
                      <KeyboardArrowDown color="primary" />
                    </div>
                  </th>

                  <th>
                    <div className="flex items-center justify-between">
                      <div>
                        <RocketLaunch color="secondary" /> <span className="ml-1 ">Action</span>{" "}
                      </div>
                      <KeyboardArrowDown color="primary" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((item, index) => {
                  return (
                    <tr className="border-b-slate-300 border-b border-solid" key={index}>
                      <td className={`h-[40px] text-left px-2 py-1 `}>
                        <span
                          className={`${item.status === "Working" ? "text-slate-500" : "underline text-blue-700 cursor-pointer"}`}
                          onClick={() => {
                            if (item.status !== "Working") {
                              handleDashboard(item.name);
                            }
                          }}
                        >
                          {item.name}
                        </span>
                      </td>
                      <td className="h-[40px] text-left px-2 py-1 text-slate-500 overflow-wrap break-word">{item.workorder}</td>
                      <td className="h-[50px] flex text-left px-2 py-1 text-slate-500 items-center">
                        {item.status === "Working" ? (
                          <WorkingIcon width={24} height={24} color={"#3b82f6"} />
                        ) : item.status === "Home" ? (
                          <HomeIcon width={24} height={24} color={"#22c55e"}></HomeIcon>
                        ) : item.status === "Breaking" ? (
                          <BreakingIcon width={24} height={24} color={"#ef4444"}></BreakingIcon>
                        ) : null}
                        <span
                          className={`ml-2 rounded-md p-1 ${
                            item.status === "Working"
                              ? "bg-blue-400"
                              : item.status === "Home"
                              ? "bg-green-400"
                              : item.status === "Breaking"
                              ? "bg-red-400"
                              : ""
                          }  text-white`}
                        >
                          {item.status === "Breaking" ? item.breakingName : item.status}
                        </span>
                      </td>

                      <td className="h-[40px] text-left px-2 py-1 ">
                        <div className="cursor-pointer text-red-500" onClick={() => handleCheckPin(item.name, "clocking")}>
                          <AccessTime width={24} height={24} />
                          <span className="ml-2 underline">Action</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" flex flex-col w-full h-full items-center justify-start">
          <div className="flex items-center justify-between">
            <Clock size={"big"} useInterval={true} />
          </div>
          <span className="flex w-full text-2xl font-bold text-left ml-2 mt-4">Messages</span>
          <div className="flex flex-col w-full max-h-[400px] h-[200px] sm:h-full border bg-slate-200 rounded-lg text-left p-2 gap-2 mt-4 overflow-y-auto">
            {messages.map((message, index) => (
              <Alert key={index} severity={message.type === "Normal" ? "success" : "warning"}>
                <AlertTitle>
                  <span className="font-bold text-xl">{message.subject}</span> -{" "}
                  <span className="font-bold text-xs"> {moment.utc(new Date(message.created_at)).local().format("YYYY-MM-DD HH:mm")}</span>
                </AlertTitle>
                <div className="w-full flex justify-between items-center">
                  <span>{message.message}</span>
                </div>
              </Alert>
            ))}
          </div>
          <div className="flex  w-full max-w-[500px] border bg-slate-200 rounded-lg text-left p-4 gap-2 mt-4 justify-between">
            <div className="w-[100px] h-[100px] flex flex-col bg-blue-500 hover:bg-blue-300 text-white rounded-xl shadow-lg items-center justify-center gap-2 p-2">
              <WorkingIcon color={"#f0f6fc"} width={50} height={50} />
              <span className="text-[14px]">Working: {employeeCounts.Working}</span>
            </div>
            <div className="w-[100px] h-[100px] flex flex-col bg-red-500 hover:bg-red-300 text-white rounded-xl shadow-lg items-center justify-center gap-2 p-2">
              <BreakingIcon color={"#fcf0f1"} width={50} height={50} />
              <span className="text-[14px]">Breaking: {employeeCounts.Break}</span>
            </div>

            <div className="w-[100px] h-[100px] flex flex-col bg-green-500 hover:bg-green-300 text-white rounded-xl shadow-lg items-center justify-center gap-2 p-2">
              <HomeIcon color={"#edfaef"} width={50} height={50} />
              <span className="text-[14px]">Home: {employeeCounts.Home}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
