import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";

const DailyExpensesTable = (props) => {
  // const {userList}=props

  const getAllDailyExpense = useBoundStore((store) => store.getAllDailyExpense);
  const dailyExpensesList = useBoundStore((store) => store.dailyExpense);
  const deleteDailyExpense = useBoundStore((store) => store.deleteDailyExpense);
  const [searchQuery, setSearchQuery] = useState("");
  const houseHoldList = useBoundStore((store) => store.households);
 
  const householdNames = houseHoldList.map(
    (eachHouseHold) => eachHouseHold.name
  );
  const filteredDailyExpenseList=dailyExpensesList.filter((expense) =>householdNames.includes(expense.household) )
  useEffect(() => {
    getAllDailyExpense();
  }, [getAllDailyExpense]);

  const ondeleteDailyExpense = (id) => {
    deleteDailyExpense(id);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div className="flex flex-row justify-between">
          <FaFilter className="mt-5 mr-20 text-blue-800" />
          <Link to={"/primaryuser/dailyexpenseform"}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
          </Link>
        </div>
      </div>
      <div className="relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500  m-3 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Expense Type
              </th>
              <th scope="col" className="px-6 py-3">
                Paid By
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDailyExpenseList
              .filter(
                (m) =>
                  m.selectExpense
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  m.paidBy.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((eachDailyExpense) => (
                <tr className="border-b bg-gray-50 " key={eachDailyExpense._id}>
                  <td className="px-6 py-4">
                    {eachDailyExpense.paymentDetails.date}
                  </td>
                  <td className="px-6 py-4">
                    {eachDailyExpense.selectExpense}
                  </td>
                  <td className="px-6 py-4">{eachDailyExpense.paidBy}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-between">
                      <Link
                        to={`/primaryuser/dailyexpenses/${eachDailyExpense._id}`}
                      >
                        <AiOutlineEdit className="w-8 h-6" />
                      </Link>
                      <AiOutlineDelete
                        onClick={() =>
                          ondeleteDailyExpense(eachDailyExpense._id)
                        }
                        className="w-8 h-6 cursor-pointer ml-1"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DailyExpensesTable;
