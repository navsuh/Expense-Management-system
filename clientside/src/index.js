import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import ExpenseTypeTable from "./components/Admin/expenseTypeTable";
import UserTable from "./components/Admin/userTable";

import PrimaryUser from "./components/Primary user/PrimaryUser";
import HouseholdTable from "./components/Primary user/houseHoldTable";
import MemberTable from "./components/Primary user/memberTable";
import PeriodicExpensesTable from "./components/Primary user/periodicExpensesTable";
import DailyExpensesTable from "./components/Primary user/dailyExpensesTable";
import MemberUser from "./components/member/member";
import Register from "./components/Register";
import Login from "./components/Login ";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
    <Route index={true} element={<Login/>}></Route>
      <Route  path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
        {/* <Route index={true} element={<LoginForm/>}/> */}
        <Route path="/admin" element={<Admin />}>
          <Route path="expensetype" element={<ExpenseTypeTable />} />
          <Route path="users" element={<UserTable />} />
        </Route>

        <Route path="/primaryuser" element={<PrimaryUser />}>
          <Route path="household" element={<HouseholdTable />} />
          <Route path="members" element={<MemberTable />} />
          <Route path="periodicexpenses" element={<PeriodicExpensesTable />} />
          <Route path="dailyexpenses" element={<DailyExpensesTable />} />
        </Route>

        <Route path="/memberuser" element={<MemberUser />}>
         
          <Route path="periodicexpenses" element={<PeriodicExpensesTable />} />
          <Route path="dailyexpenses" element={<DailyExpensesTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
