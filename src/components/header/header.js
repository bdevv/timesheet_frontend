import { AccessTime, Assignment, Coffee, Message, People, Person, Settings, ViewList, ViewTimeline } from "@mui/icons-material";
import React from "react";
const Header = ({ text, step, backToModules }) => {
  return (
    <div className="flex w-full h-[70px] items-end border-[#EDEDED] bg-white text-primary shadow-md">
      <div className="flex w-full h-[70px] ml-8 items-center justify-start">
        {text === "Breaks" ? (
          <Coffee color="primary" fontSize="large"></Coffee>
        ) : text === "Work Orders" ? (
          <ViewList color="primary" fontSize="large"></ViewList>
        ) : text === "Work Shifts" ? (
          <Person color="primary" fontSize="large"></Person>
        ) : text === "Employees" ? (
          <People color="primary" fontSize="large"></People>
        ) : text === "Assignment" ? (
          <Assignment color="primary" fontSize="large"></Assignment>
        ) : text === "Settings" ? (
          <Settings color="primary" fontSize="large"></Settings>
        ) : text === "Messages" ? (
          <Message color="primary" fontSize="large"></Message>
        ) : text === "Clock-in/out" ? (
          <AccessTime color="primary" fontSize="large"></AccessTime>
        ) : text === "TimeSheet" ? (
          <ViewTimeline color="primary" fontSize="large"></ViewTimeline>
        ) : null}
        <span className="w-full text-3xl font-bold leading-10 text-left justify-start ml-4 ">{text}</span>
      </div>
    </div>
  );
};

export default Header;
