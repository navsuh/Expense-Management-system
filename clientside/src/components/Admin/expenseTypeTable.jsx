import { useEffect, useState } from "react";

import { useBoundStore } from "../../store.js";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";

import SearchInput from "../searchInput";
import { Link } from "react-router-dom";

// const expenseList = [
//   { _id: "1", name: "Expense type 1" },
//   { _id: "2", name: "Expense type 2" },
// ];

const ExpenseTypeTable = (props) => {
  const getAllExpenseTypes = useBoundStore((store) => store.getAllExpenseTypes);
  const deleteExpenseTypes = useBoundStore((store) => store.deleteExpenseTypes);
  const expenseList = useBoundStore((store) => store.expenseTypes);
  // console.log(expenseList);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllExpenseTypes();
  }, [getAllExpenseTypes]);
  const deleteExpenseType = (id) => {
    deleteExpenseTypes(id);
  };
  // const {expenseList}=props
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div>
          <Link to={"/admin/expensetypeform"}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
          </Link>
        </div>
      </div>

      <div className="relative  shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500  ml-6 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Expense Type
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {expenseList
              .filter((expense) =>
                expense.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((eachExpense) => (
                <tr className="border-b bg-gray-50 " key={eachExpense._id}>
                  <td className="px-6 py-4">{eachExpense.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-between">
                      <Link to={`/admin/expensetype/${eachExpense._id}`}>
                        <AiOutlineEdit className="w-8 h-6" />
                      </Link>
                      <AiOutlineDelete
                        onClick={() => deleteExpenseType(eachExpense._id)}
                        className="w-8 h-6 ml-1 cursor-pointer"
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

export default ExpenseTypeTable;
