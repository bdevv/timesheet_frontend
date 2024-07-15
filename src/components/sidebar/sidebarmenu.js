import React, { useState } from "react";
import SidebarMenuItem from "./sidebarmenuitem";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { activeTab } from "../../redux/authslice";
import { useNavigate } from "react-router-dom";
const SidebarMenu = () => {
  const name = useSelector((state) => state.tab.name);
  const isManager = useSelector((state) => state.tab.isManager);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(name === "admin" ? 2 : 1);
  return (
    <div className="relative flex flex-col w-full h-[100vh] justify-start text-primary ">
      <div
        className="flex w-full h-[70px] bg-[#1976d2] items-center shadow-lg cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src="/images/logo.png" className="w-[30px] h-[30px] ml-2" alt="logo"></img>
        <span className="text-white text-xl font-bold ml-2">Pastians</span>
        <span className="text-white text-xl font-thin">Bakery</span>
      </div>
      <div className="flex w-full h-[70px] items-center p-2 border-b-2">
        <AccountCircle fontSize="large" color="primary"></AccountCircle>
        <span className="text-lg font-bold text-pink-600">{name}</span>
      </div>
      <div className="mt-4">
        {name !== "admin" && (
          <SidebarMenuItem
            text={"Clock-in/out"}
            active={active === 1 ? true : false}
            onClick={() => {
              setActive(1);
              dispatch(activeTab(1));
            }}
          ></SidebarMenuItem>
        )}
        {(name === "admin" || isManager) && (
          <SidebarMenuItem
            text={"Messages"}
            active={active === 2 ? true : false}
            onClick={() => {
              setActive(2);
              dispatch(activeTab(2));
            }}
          ></SidebarMenuItem>
        )}
        {name === "admin" && (
          <SidebarMenuItem
            text={"Assignments"}
            active={active === 3 ? true : false}
            onClick={() => {
              setActive(3);
              dispatch(activeTab(3));
            }}
          ></SidebarMenuItem>
        )}
        {name === "admin" && (
          <SidebarMenuItem
            text={"Breaks"}
            active={active === 4 ? true : false}
            onClick={() => {
              setActive(4);
              dispatch(activeTab(4));
            }}
          ></SidebarMenuItem>
        )}
        {name === "admin" && (
          <SidebarMenuItem
            text={"Work Orders"}
            active={active === 5 ? true : false}
            onClick={() => {
              setActive(5);
              dispatch(activeTab(5));
            }}
          ></SidebarMenuItem>
        )}
        {name === "admin" && (
          <SidebarMenuItem
            text={"Work Shifts"}
            active={active === 6 ? true : false}
            onClick={() => {
              setActive(6);
              dispatch(activeTab(6));
            }}
          ></SidebarMenuItem>
        )}
        {name === "admin" && (
          <SidebarMenuItem
            text={"Employees"}
            active={active === 7 ? true : false}
            onClick={() => {
              setActive(7);
              dispatch(activeTab(7));
            }}
          ></SidebarMenuItem>
        )}
        {name !== "admin" && (
          <SidebarMenuItem
            text={"Settings"}
            active={active === 8 ? true : false}
            onClick={() => {
              setActive(8);
              dispatch(activeTab(8));
            }}
          ></SidebarMenuItem>
        )}
        {(name === "admin" || isManager) && (
          <SidebarMenuItem
            text={"TimeSheet"}
            active={active === 9 ? true : false}
            onClick={() => {
              setActive(9);
              dispatch(activeTab(9));
            }}
          ></SidebarMenuItem>
        )}
      </div>
      <div
        className="absolute flex w-[90px] h-[24px] ml-4 cursor-pointer bottom-4  hover:font-bold "
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="text-[#5C6350] font-Inter text-base">Logout</span>
        <div className="ml-2">
          <Logout color="primary"></Logout>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
