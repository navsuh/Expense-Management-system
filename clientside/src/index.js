import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Admin from "./components/Admin/Admin";
import ExpenseTypeTable from "./components/Admin/expenseTypeTable";
import UserTable from "./components/Admin/userTable";

import PrimaryUser from "./components/Primary user/PrimaryUser";
import HouseholdTable from "./components/Primary user/houseHoldTable";
import MemberTable from "./components/Primary user/memberTable";
import PeriodicExpensesTable from "./components/Primary user/periodicExpensesTable";
import DailyExpensesTable from "./components/Primary user/dailyExpensesTable";

import MemberUser from "./components/member/member";
import PeriodicExpensesTableMember from "./components/member/periodicExpensesTable";
import DailyExpensesTableMember from "./components/member/dailyExpensesTable";

import Register from "./components/Register";
import Login from "./components/Login ";

import PeriodicExpenseForm from "./components/Forms/periodicexpenseForm";

import ResetPasswordForm from "./components/Forms/ResetPasswordForm";

import PrivateRoute from "./components/privateRoute";
import Error401 from "./components/Errorpage";

import OTPFORM from "./components/OTPForm";
import PrivateRouteResetPassword from "./components/privateRouteResetPassword";

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer limit={1}/>
    <BrowserRouter>
      <App />
      <Routes>
        <Route index={true} element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index={true} element={<ExpenseTypeTable />} />
          <Route path="expensetype" element={<ExpenseTypeTable />} />
          <Route path="expensetype/:id" element={<ExpenseTypeTable />} />
          <Route path="users" element={<UserTable />} />
          <Route path="users/:id" element={<UserTable />} />
        </Route>

        <Route
          path="/primaryuser"
          element={
            <PrivateRoute>
              <PrimaryUser />
            </PrivateRoute>
          }
        >
          <Route index={true} element={<HouseholdTable />} />
          <Route path="household" element={<HouseholdTable />} />
          <Route path="household/:id" element={<HouseholdTable />} />
          <Route path="members" element={<MemberTable />} />
          <Route path="members/:id" element={<MemberTable />} />
          <Route path="periodicexpenses" element={<PeriodicExpensesTable />} />
          <Route
            path="periodicexpenses/:id"
            element={<PeriodicExpensesTable />}
          />
          <Route path="dailyexpenses" element={<DailyExpensesTable />} />
          <Route path="dailyexpenses/:id" element={<DailyExpensesTable />} />
        </Route>

        <Route
          path="/memberuser"
          element={
            <PrivateRoute>
              <MemberUser />
            </PrivateRoute>
          }
        >
          <Route index={true} element={<PeriodicExpensesTableMember />} />
          <Route
            path="periodicexpenses"
            element={<PeriodicExpensesTableMember />}
          />
          <Route
            path="periodicexpenses/:id"
            element={<PeriodicExpensesTableMember />}
          />
          <Route path="dailyexpenses" element={<DailyExpensesTableMember />} />
          <Route
            path="dailyexpenses/:id"
            element={<DailyExpensesTableMember />}
          />
        </Route>

        <Route
          path="/memberuser/periodicexpenses/:id"
          element={
            <PrivateRoute>
              <PeriodicExpenseForm />
            </PrivateRoute>
          }
        />
        {/* <Route path="/otpform" element={<OTPFORM />} /> */}
        <Route path="/resetpassword" element={<PrivateRouteResetPassword><ResetPasswordForm /></PrivateRouteResetPassword>} />
        {/* <Route path="*" element={<Error401 />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
