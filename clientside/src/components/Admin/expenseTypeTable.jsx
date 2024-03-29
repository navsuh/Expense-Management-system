import React, { useEffect, useState } from "react";
import { useBoundStore } from "../../store.js";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import SearchInput from "../searchInput";
import { Link, useNavigate } from "react-router-dom";
import ExpenseTypeForm from "../Forms/expensetypeForm.jsx";
import Pagination from "../Pagination.jsx";
import ConfirmDelete from "../Forms/deleteConfirm.jsx";

const ExpenseTypeTable = (props) => {
  const getAllExpenseTypes = useBoundStore((store) => store.getAllExpenseTypes);
  const deleteExpenseTypes = useBoundStore((store) => store.deleteExpenseTypes);
  const expenseList = useBoundStore((store) => store.expenseTypes);

  const [searchQuery, setSearchQuery] = useState("");
  const [isExpenseTypeModalOpen, setIsExpenseTypeModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dataPerPage = 4;

  useEffect(() => {
    const fetchExpenseTypes = async () => {
      await getAllExpenseTypes();
    };
    fetchExpenseTypes();

    return () => {
      console.log("cleaned up getAll ExpenseTypes");
    };
  }, [getAllExpenseTypes]);

  const deleteExpenseType = (id) => {
    deleteExpenseTypes(id);
  };

  const handleModalClose = () => {
    setIsExpenseTypeModalOpen(false);
    setIsDeleteModalOpen(false);
    navigate("/admin/expensetype");
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

  if (currentExpenses.length === 0 && currentPage !== 1) {
    setCurrentPage((prevState) => prevState - 1);
  }

  const displayExpenseTypeTable = () => {
    return (
      <>
        <table className="w-full sm:w-[65rem] text-sm text-left text-gray-500 mx-auto sm:ml-6 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-3">
                Expense Type
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 sm:py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.map((eachExpense) => (
              <tr className="border-b bg-gray-50" key={eachExpense._id}>
                <td className="px-4 py-2 sm:px-6 sm:py-4">{eachExpense.name}</td>
                <td className="px-4 py-2 sm:px-6 sm:py-4">
                  <div className="flex items-center">
                    <Link
                      to={`/admin/expensetype/${eachExpense._id}`}
                      onClick={() => setIsExpenseTypeModalOpen(true)}
                      className="mr-2"
                    >
                      <AiOutlineEdit className="w-8 h-8 p-1 hover:text-white hover:bg-blue-500 bg-gray-200 rounded-3xl text-blue-500"/>
                    </Link>

                    <AiOutlineDelete
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteId(eachExpense._id);
                      }}
                      className="w-8 h-8 p-1 ml-2 cursor-pointer text-red-500 bg-gray-200 hover:text-white rounded-3xl hover:bg-red-500"
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
        isExpenseTypeModalOpen={isExpenseTypeModalOpen}
        handleModalClose={handleModalClose}
      />
      <ConfirmDelete
        isDeleteModalOpen={isDeleteModalOpen}
        handleModalClose={handleModalClose}
        deleteRecord={deleteExpenseType}
        deleteId={deleteId}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ">
        <div className=" sm:mb-0 ">
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div>
          <button onClick={() => setIsExpenseTypeModalOpen(true)}>
            <IoAddCircle className="text-blue-800 h-14 w-14 hover:text-blue-600" />
          </button>
        </div>
      </div>

      <div className="relative sm:rounded-lg mt-4">
        {filteredExpenseList.length === 0 ? (
          <div className="p-4">No data found.</div>
        ) : (
          displayExpenseTypeTable()
        )}
      </div>
    </>
  );
};

export default ExpenseTypeTable;
