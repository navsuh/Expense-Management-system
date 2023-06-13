import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";


const PeriodicExpensesTableMember = (props) => {
  // const {userList}=props
  const getAllPeriodicExpense =useBoundStore(store=>store.getAllPeriodicExpense)
  const periodicExpenseList =useBoundStore(store=>store.periodicExpense)
  const deletePeriodicExpenses = useBoundStore(store=>store.deletePeriodicExpense)

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{
    getAllPeriodicExpense();
  },[getAllPeriodicExpense])
  

  const ondeletePeriodicExpense=(id)=>{
    deletePeriodicExpenses(id)

   }
  return (
    <>
    <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value)=>setSearchQuery(value)} />
        </div>
        <div className="flex flex-row justify-between">
          <FaFilter className="mt-5 mr-20 text-blue-800" />

          {/* <Link to={"/primaryuser/periodicexpenseform"}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
          </Link> */}
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
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
            {periodicExpenseList.filter((expense) =>
                expense.selectExpense.toLowerCase().includes(searchQuery.toLowerCase()) || expense.paidBy.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((eachPeriodicExpense) => (
              <tr
                className="border-b bg-gray-50 "
                key={eachPeriodicExpense._id}
              >
                <td className="px-6 py-4">{eachPeriodicExpense.dueDate}</td>
                <td className="px-6 py-4">{eachPeriodicExpense.selectExpense}</td>
                <td className="px-6 py-4">{eachPeriodicExpense.paidBy}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                  <Link
                      to={`/memberuser/periodicexpenses/${eachPeriodicExpense._id}`}
                    >
                    <AiOutlineEdit className="w-8 h-6" />
                    </Link>
                    <AiOutlineDelete onClick={()=>ondeletePeriodicExpense(eachPeriodicExpense._id)} className="w-8 h-6" />
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

export default PeriodicExpensesTableMember;
