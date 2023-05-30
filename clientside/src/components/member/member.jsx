import Tablist from '../tabList';

import {
    Outlet
  } from "react-router-dom";

const tabList=[{_id:1,tabName:"Periodic Expenses",tabPath:"/memberuser/periodicexpenses"},{_id:2,tabName:"Daily Expenses",tabPath:"/memberuser/dailyexpenses"}]



const MemberUser = () => {
    return ( <>
  
    <div className="p-4 sm:ml-64">
        
    <Tablist tabList={tabList}/>
    {/* <ExpenseTypeTable expenseList={expenseList}/> */}
    <Outlet/>
    {/* <UserTable userList={userList}/> */}
        </div>
    
    </> );
}
 
export default MemberUser;