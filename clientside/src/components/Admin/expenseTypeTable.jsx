import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";

import SearchInput from "../searchInput";
import { Link } from "react-router-dom";

const expenseList = [
  { _id: "1", name: "Expense type 1" },
  { _id: "2", name: "Expense type 2" },
];

const ExpenseTypeTable = (props) => {
  // const {expenseList}=props
  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <SearchInput />
        </div>
        <div>
            <Link to={"/admin/expensetypeform"}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
        </Link>
          
        </div>
      </div>

      <div className="w-full relative  shadow-md sm:rounded-lg ml-6">
        <table className="w-11/12 text-sm text-left text-gray-500  ml-6 rounded-lg">
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
            {expenseList.map((eachExpense) => (
              <tr className="border-b bg-gray-50 " key={eachExpense._id}>
                <td className="px-6 py-4">{eachExpense.name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                  <Link to={`/admin/expensetype/${eachExpense._id}`}>
                    <AiOutlineEdit className="w-8 h-6" />
                    </Link>
                    <AiOutlineDelete className="w-8 h-6" />
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
