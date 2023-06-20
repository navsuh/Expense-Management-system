import { v4 as uuidv4 } from "uuid";
import Sidebar from "../sidebar";
import Tablist from "../tabList";
import { useBoundStore } from "../../store.js";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const tabList = [
  { _id: uuidv4(), tabName: "Expense type", tabPath: "/admin/expensetype" },
  { _id: uuidv4(), tabName: "Users", tabPath: "/admin/users" },
];

const Admin = () => {
  const user = useBoundStore((store) => store.user);
  if (user.role !== "Admin") {
    sessionStorage.removeItem("token");
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Sidebar></Sidebar>
        <h1 className="ml-7 font-semibold text-2xl">Dashboard</h1>

        <Tablist tabList={tabList} />

        <Outlet />
      </div>
    </>
  );
};

export default Admin;
