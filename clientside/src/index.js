import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";


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
import PeriodicExpensesTableMember from "./components/member/periodicExpensesTable";
import DailyExpensesTableMember from "./components/member/dailyExpensesTable";



import Register from "./components/Register";
import Login from "./components/Login ";
import CreateMemberForm from "./components/Forms/createMembersForm";
import EditMemberForm from "./components/Forms/editMembersForm";
import PeriodicExpenseForm from "./components/Forms/periodicexpenseForm";
import DailyExpenseForm from "./components/Forms/dailyexpenseForm";

// import { ToastContainer} from "react-toastify";
// import ChangePasswordForm from "./components/Forms/ChangePasswordForm";
// import ForgotPasswordForm from "./components/Forms/ForgetPasswordForm";
import ResetPasswordForm from "./components/Forms/ResetPasswordForm";

import PrivateRoute from "./components/privateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <ToastContainer limit={1}/> */}
      <App />
      <Routes>

        <Route index={true} element={<Login />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route index={true} element={<LoginForm/>}/> */}
        
        
        <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>}>
          <Route index={true} element={<ExpenseTypeTable />} />
          <Route path="expensetype" element={<ExpenseTypeTable />} />
          <Route path="users" element={<UserTable />} />
          {/* <Route path="expensetypeform" element={<ExpenseTypeForm />} /> */}
        </Route>
        
        <Route path="/admin/expensetypeform" element={<PrivateRoute><ExpenseTypeForm /></PrivateRoute>} />
        <Route path="/admin/expensetype/:id" element={<PrivateRoute><ExpenseTypeForm /></PrivateRoute>} />
        
        {/* <Route path="/admin/userform" element={<PrivateRoute><UserForm /></PrivateRoute>} /> */}
        <Route path="/admin/users/:id" element={<PrivateRoute><UserForm /></PrivateRoute>} />


        <Route path="/primaryuser" element={<PrivateRoute><PrimaryUser /></PrivateRoute>}>
          <Route index={true} element={<HouseholdTable />} />
          <Route path="household" element={<HouseholdTable />} />
          <Route path="members" element={<MemberTable />} />
        <Route path="members/:id" element={<MemberTable />} />
          <Route path="periodicexpenses" element={<PeriodicExpensesTable />} />
          <Route path="dailyexpenses" element={<DailyExpensesTable />} />
        </Route>
        
        <Route path="/primaryuser/householdform" element={<PrivateRoute><HouseHoldForm/></PrivateRoute>}/>
        <Route path="/primaryuser/household/:id" element={<PrivateRoute><HouseHoldForm/></PrivateRoute>}/>

        {/* <Route path="/primaryuser/memberform" element={<PrivateRoute><CreateMemberForm/></PrivateRoute>}/> */}
        {/* <Route path="/primaryuser" element={<PrivateRoute><PrimaryUser /></PrivateRoute>}>
        </Route> */}

        <Route path="/primaryuser/periodicexpenseform" element={<PrivateRoute><PeriodicExpenseForm/></PrivateRoute>}/>
        <Route path="/primaryuser/periodicexpenses/:id" element={<PrivateRoute><PeriodicExpenseForm/></PrivateRoute>}/>

        <Route path="/primaryuser/dailyexpenseform" element={<PrivateRoute><DailyExpenseForm/></PrivateRoute>}/>
        <Route path="/primaryuser/dailyexpenses/:id" element={<PrivateRoute><DailyExpenseForm/></PrivateRoute>}/>

        
        
        <Route path="/memberuser" element={<PrivateRoute><MemberUser /></PrivateRoute>}>
          <Route index={true} element={<PeriodicExpensesTableMember  />} />
          <Route path="periodicexpenses" element={<PeriodicExpensesTableMember />} />
          <Route path="dailyexpenses" element={<DailyExpensesTableMember />} />
        </Route>

        <Route path="/memberuser/periodicexpenses/:id" element={<PrivateRoute><PeriodicExpenseForm/></PrivateRoute>}/>

        <Route path="/memberuser/dailyexpenseform" element={<PrivateRoute><DailyExpenseForm/></PrivateRoute>}/>
        <Route path="/memberuser/dailyexpenses/:id" element={<PrivateRoute><DailyExpenseForm/></PrivateRoute>}/>

        
        {/* <Route path="/changepassword" element={<PrivateRoute><ChangePasswordForm/></PrivateRoute>}/> */}
        <Route path="/resetpassword" element={<ResetPasswordForm/>}/>
        


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
