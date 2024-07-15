import React from "react";
import { AccessTime, FreeBreakfast, Message, People, Person, Settings, TableView, ViewList, ViewTimeline } from "@mui/icons-material";

const SidebarMenuItem = ({ text, active, onClick }) => {
  return (
    <div
      className={`flex w-full h-[50px] ${
        active ? "border-l-4 border-l-[#03a9f3] font-bold text-[#03a9f3]" : ""
      } border-t-0 border-l-0 border-b-0 items-center p-2  mt-1 hover:bg-[#d3e7ff] cursor-pointer `}
      onClick={onClick}
    >
      {text === "Clock-in/out" ? (
        <AccessTime color="primary" />
      ) : text === "Messages" ? (
        <Message color="primary" />
      ) : text === "Assignments" ? (
        <TableView color="primary" />
      ) : text === "Breaks" ? (
        <FreeBreakfast color="primary" />
      ) : text === "Work Orders" ? (
        <ViewList color="primary" />
      ) : text === "Work Shifts" ? (
        <Person color="primary" />
      ) : text === "Employees" ? (
        <People color="primary" />
      ) : text === "Settings" ? (
        <Settings color="primary" />
      ) : text === "TimeSheet" ? (
        <ViewTimeline color="primary" />
      ) : null}
      <span className="font-Inter text-sm ml-2 ">{text}</span>
    </div>
  );
};

export default SidebarMenuItem;
