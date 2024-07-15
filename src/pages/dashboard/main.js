import React from "react";
import { MainLayout } from "../../mainlayout/mainlayout";
import Header from "../../components/header/header";
import Breaks from "./breaks";
import { useSelector } from "react-redux";
import Employee from "./employee";
import WorkShifts from "./workshifts";
import WorkOrders from "./workorders";
import Assignment from "./assignment";
import ClockInOut from "./clockinout";
import Settings from "./settings";
import Messages from "./messages";
import TimeSheet from "./timesheet";
const Main = () => {
  const activeTab = useSelector((state) => state.tab.value);
  return (
    <MainLayout>
      <div className="flex flex-col w-full h-full font-bold font-Inter ">
        <Header
          text={
            activeTab === 1
              ? "Clock-in/out"
              : activeTab === 2
              ? "Messages"
              : activeTab === 3
              ? "Assignment"
              : activeTab === 4
              ? "Breaks"
              : activeTab === 5
              ? "Work Orders"
              : activeTab === 6
              ? "Work Shifts"
              : activeTab === 7
              ? "Employees"
              : activeTab === 8
              ? "Settings"
              : activeTab === 9
              ? "TimeSheet"
              : ""
          }
        ></Header>
        <div className="flex flex-col w-full p-4">
          {activeTab === 1 ? (
            <ClockInOut></ClockInOut>
          ) : activeTab === 2 ? (
            <Messages></Messages>
          ) : activeTab === 3 ? (
            <Assignment></Assignment>
          ) : activeTab === 4 ? (
            <Breaks></Breaks>
          ) : activeTab === 5 ? (
            <WorkOrders />
          ) : activeTab === 6 ? (
            <WorkShifts />
          ) : activeTab === 7 ? (
            <Employee />
          ) : activeTab === 8 ? (
            <Settings />
          ) : activeTab === 9 ? (
            <TimeSheet />
          ) : null}
        </div>
      </div>
    </MainLayout>
  );
};

export default Main;
