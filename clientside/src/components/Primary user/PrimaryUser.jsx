
import Sidebar from "../sidebar";
import Tablist from "../tabList";

import { useBoundStore } from "../../store.js";

import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const tabList = [
  { _id: 1, tabName: "Household", tabPath: "/primaryuser/household" },
  { _id: 2, tabName: "Members", tabPath: "/primaryuser/members" },
  {
    _id: 3,
    tabName: "Periodic Expenses",
    tabPath: "/primaryuser/periodicexpenses",
  },
  { _id: 4, tabName: "Daily Expenses", tabPath: "/primaryuser/dailyexpenses" },
];

// const expenseList=[{_id:1,name:"Expense type 1"},{_id:2,name:"Expense type 2"}]

// const userList=[{_id:1,firstName:"user 1 fName",lastName:"user 1 lName",email:"user 1 email",
// phone:"user 1 phone",userName:"user 1 userName",role:"user 1 role",lastLoggedIn:"user 1 lastLoggedIn",
// isActive:true,updatedBy:"user 1 updatedBy",updatedAt:"user1 updatedAt"},
// {_id:1,firstName:"user 2 fName",lastName:"user 2 lName",email:"user 2 email",
// phone:"user 2 phone",userName:"user 2 userName",role:"user 2 role",lastLoggedIn:"user 2 lastLoggedIn",
// isActive:true,updatedBy:"user 2 updatedBy",updatedAt:"user2 updatedAt"}

// ]

const PrimaryUser = () => {
  const user = useBoundStore((store) => store.user);
  if(user.role!=="Primaryuser"){
    sessionStorage.removeItem("token")
return <Navigate to="/login" replace={true} />
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
