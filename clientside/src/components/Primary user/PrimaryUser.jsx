import { v4 as uuidv4 } from "uuid";
import Sidebar from "../sidebar";
import Tablist from "../tabList";

import { useBoundStore } from "../../store.js";

import { Outlet } from "react-router-dom";

import { Navigate } from "react-router-dom";

const tabList = [
  { _id: uuidv4(), tabName: "Household", tabPath: "/primaryuser/household" },
  { _id: uuidv4(), tabName: "Members", tabPath: "/primaryuser/members" },
  {
    _id: uuidv4(),
    tabName: "Periodic Expenses",
    tabPath: "/primaryuser/periodicexpenses",
  },
  {
    _id: uuidv4(),
    tabName: "Daily Expenses",
    tabPath: "/primaryuser/dailyexpenses",
  },
];

const PrimaryUser = () => {
  const user = useBoundStore((store) => store.user);
  if (user.role !== "Primaryuser") {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Sidebar />
        <h1 className="ml-7 font-semibold text-2xl">Dashboard</h1>
        <Tablist tabList={tabList} />
        <Outlet />
      </div>
    </>
  );
};

export default PrimaryUser;
