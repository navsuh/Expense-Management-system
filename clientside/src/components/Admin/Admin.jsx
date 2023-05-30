import Sidebar from '../sidebar';
import Tablist from '../tabList';
import ExpenseTypeTable from './expenseTypeTable';
import UserTable from './userTable';
import {
    Outlet
  } from "react-router-dom";

const tabList=[{_id:1,tabName:"Expense type",tabPath:"/admin/expensetype"},{_id:2,tabName:"Users",tabPath:"/admin/users"}]

const expenseList=[{_id:1,name:"Expense type 1"},{_id:2,name:"Expense type 2"}]

const userList=[{_id:1,firstName:"user 1 fName",lastName:"user 1 lName",email:"user 1 email",
phone:"user 1 phone",userName:"user 1 userName",role:"user 1 role",lastLoggedIn:"user 1 lastLoggedIn",
isActive:true,updatedBy:"user 1 updatedBy",updatedAt:"user1 updatedAt"},
{_id:1,firstName:"user 2 fName",lastName:"user 2 lName",email:"user 2 email",
phone:"user 2 phone",userName:"user 2 userName",role:"user 2 role",lastLoggedIn:"user 2 lastLoggedIn",
isActive:true,updatedBy:"user 2 updatedBy",updatedAt:"user2 updatedAt"}

]

const Admin = () => {
    return ( <>
  
    <div className="p-4 sm:ml-64">
     <Sidebar></Sidebar>   
    <Tablist tabList={tabList}/>
    {/* <ExpenseTypeTable expenseList={expenseList}/> */}
    <Outlet/>
    {/* <UserTable userList={userList}/> */}
        </div>
    
    </> );
}
 
export default Admin;