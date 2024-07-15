import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import MenuAppBar from "../components/appbar/appbar";
export const MainLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-100 ">
      <div className="flex flex-col w-full h-full bg-white  lg:flex-row  ">
        <div className="w-[220px] border border-l-0 border-b-0 border-t-0 border-r-[#EDEDED] lg:block hidden shadow-lg">
          <Sidebar />
        </div>
        <div className="lg:hidden block w-full">
          <MenuAppBar />
        </div>
        <div className="w-full h-full max-h-[100vh] overflow-x-hidden overflow-y-auto lg:flex-1  lg:mt-0 bg-slate-100">{children}</div>
      </div>
    </div>
  );
};
