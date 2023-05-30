import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import ExpenseTypeTable from "./components/Admin/expenseTypeTable";
import UserTable from "./components/Admin/userTable";
import ExpenseTypeForm from "./components/Forms/expensetypeForm";
import UserForm from "./components/Forms/userForm";

import PrimaryUser from "./components/Primary user/PrimaryUser";
import HouseholdTable from "./components/Primary user/houseHoldTable";
import MemberTable from "./components/Primary user/memberTable";
import PeriodicExpensesTable from "./components/Primary user/periodicExpensesTable";
import DailyExpensesTable from "./components/Primary user/dailyExpensesTable";
import HouseHoldForm from "./components/Forms/houseHoldForm";


import MemberUser from "./components/member/member";
import Register from "./components/Register";
import Login from "./components/Login ";
import MemberForm from "./components/Forms/membersForm";
import PeriodicExpenseForm from "./components/Forms/periodicexpenseForm";
import DailyExpenseForm from "./components/Forms/dailyexpenseForm";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route index={true} element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route index={true} element={<LoginForm/>}/> */}
        <Route path="/admin" element={<Admin />}>
          <Route index={true} element={<ExpenseTypeTable />} />
          <Route path="expensetype" element={<ExpenseTypeTable />} />
          <Route path="users" element={<UserTable />} />
        </Route>
        <Route path="/admin/expensetypeform" element={<ExpenseTypeForm />} />
        <Route path="/admin/userform" element={<UserForm />} />

        <Route path="/primaryuser" element={<PrimaryUser />}>
          <Route index={true} element={<HouseholdTable />} />
          <Route path="household" element={<HouseholdTable />} />
          <Route path="members" element={<MemberTable />} />
          <Route path="periodicexpenses" element={<PeriodicExpensesTable />} />
          <Route path="dailyexpenses" element={<DailyExpensesTable />} />
        </Route>
        
        <Route path="/primaryuser/householdform" element={<HouseHoldForm/>}/>
        <Route path="/primaryuser/memberform" element={<MemberForm/>}/>
        <Route path="/primaryuser/periodicexpenseform" element={<PeriodicExpenseForm/>}/>
        <Route path="/primaryuser/dailyexpenseform" element={<DailyExpenseForm/>}/>


        
        <Route path="/memberuser" element={<MemberUser />}>
          <Route index={true} element={<PeriodicExpensesTable />} />
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
