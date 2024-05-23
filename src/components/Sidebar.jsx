import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { MdOutlineLightMode } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMoonOutline } from "react-icons/io5";
import { FaUser, FaUsers } from "react-icons/fa";

const Sidebar = ({ lightOrDark, setLightOrDark }) => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const currentKey = pathname.pop();
  const router = useNavigate();

  const [currentPage, setCurrentPage] = useState(currentKey);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const getCurrentKey = ({ key }) => {
    setCurrentPage(key);
  };
  const items = [
    getItem(
      <Link to="/Dashboard">Dashboard</Link>,
      "Dashboard",
      <BiSolidDashboard />
    ),
    getItem(<Link to={"/employee"}>Employee</Link>, "employee", <FiUsers />),
    getItem(
      <Link to={"/chain-of-command"}>Chain of command</Link>,
      "chain-of-command",
      <FaUsers />
    ),
  ];
  return (
    <div
      className={`${
        lightOrDark === "dark" && "dark-mode"
      } w-full h-full flex flex-col justify-between p-3`}
    >
      <div>
        <h1 className={`${lightOrDark === "dark" && "dark-mode"} logo-title`}>
          Employee Management
        </h1>
        <hr className="mb-1 -mt-2 w-full" />
        <Menu
          className={`${
            lightOrDark === "dark" && "dark-mode"
          } w-full overflow-auto`}
          onClick={getCurrentKey}
          defaultSelectedKeys={[currentPage]}
          defaultOpenKeys={[currentPage]}
          items={items}
        />
      </div>
      <div>
        <div className="border border-black mt-2 p-1 rounded-lg">
          <div className="w-full flex flex-row items-center justify-evenly border-black border rounded-md">
            <div className="admin-profile">
              <FaUser />
            </div>
            <span className="">
              <h1 className="title">Francis Baah</h1>
              <h2 className="sub-title text-center">Challenge</h2>
            </span>
          </div>
          <div onClick={() => router("/")} className="logout cursor-pointer">
            Log out <LogoutOutlined className="mt-1" />
          </div>
        </div>
        <div className="w-full bottom-0 flex justify-between rounded-md bg-[#0c2d4c] mt-2 p-1 px-2">
          <span
            onClick={() => setLightOrDark("light")}
            className={`${
              lightOrDark === "light" ? "bg-white lightORDark" : ""
            } flex gap-2 items-center justify-center text-white w-[70px] rounded-md cursor-pointer`}
          >
            <MdOutlineLightMode /> Light
          </span>
          <span
            onClick={() => setLightOrDark("dark")}
            className={`${
              lightOrDark === "dark" ? "bg-white lightORDark" : ""
            } flex gap-2 items-center justify-center  text-white w-[70px] rounded-md cursor-pointer`}
          >
            <IoMoonOutline /> Dark
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
