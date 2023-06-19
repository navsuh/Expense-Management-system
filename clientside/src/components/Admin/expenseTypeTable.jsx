import { useEffect, useState } from "react";
import { useBoundStore } from "../../store.js";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import ExpenseTypeForm from "../Forms/expensetypeForm.jsx";
import Pagination from "../Pagination.jsx";

const ExpenseTypeTable = (props) => {
  const getAllExpenseTypes = useBoundStore((store) => store.getAllExpenseTypes);
  const deleteExpenseTypes = useBoundStore((store) => store.deleteExpenseTypes);
  const expenseList = useBoundStore((store) => store.expenseTypes);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 4;

  useEffect(() => {
    getAllExpenseTypes();
  }, [getAllExpenseTypes]);

  const deleteExpenseType = (id) => {
    deleteExpenseTypes(id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredExpenseList = expenseList.filter((expense) =>
    expense.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const currentExpenses = filteredExpenseList.slice(firstIndex, lastIndex);

  
  const displayExpenseTypeTable = () => {
    return (
      <>
        <table className="w-[65rem] text-sm text-left text-gray-500 ml-6 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500">
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
            {currentExpenses.map((eachExpense) => (
              <tr className="border-b bg-gray-50" key={eachExpense._id}>
                <td className="px-6 py-4">{eachExpense.name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                    <Link
                      to={`/admin/expensetype/${eachExpense._id}`}
                      onClick={() => setIsModalOpen(true)}
                    >
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

        <Pagination
          total={filteredExpenseList.length}
          pageSize={dataPerPage}
          currentPage={currentPage}
          onPageChange={onPaginate}
         
        />
      </>
    );
  };

  return (
    <>
 
      <ExpenseTypeForm
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />

      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div>
          <button onClick={() => setIsModalOpen(true)}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
          </button>
        </div>
      </div>

      <div className="relative  shadow-md sm:rounded-lg">
        {currentExpenses.length === 0 ? (
          <div className="p-4">No data found.</div>
        ) : (
          displayExpenseTypeTable()
        )}
      </div>
    </>
  );
};

export default ExpenseTypeTable;
