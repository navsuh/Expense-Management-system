import Sidebar from "../sidebar";
import Tablist from "../tabList";




import { Outlet } from "react-router-dom";

const tabList = [
  {
    _id: 1,
    tabName: "Periodic Expenses",
    tabPath: "/memberuser/periodicexpenses",
  },
  { _id: 2, tabName: "Daily Expenses", tabPath: "/memberuser/dailyexpenses" },
];

const MemberUser = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <Sidebar />
        <Tablist tabList={tabList} />
        {/* <div className="flex flex-row justify-between">
          <div>
            <SearchInput />
          </div>
          <div>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
          </div>
        </div> */}
        {/* <ExpenseTypeTable expenseList={expenseList}/> */}
        <Outlet />
        {/* <UserTable userList={userList}/> */}
      </div>
    </>
  );
};

export default MemberUser;
