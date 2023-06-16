import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import SearchInput from "../searchInput";
import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { useBoundStore } from "../../store";
import { useEffect, useState } from "react";
import PeriodicExpenseForm from "../Forms/periodicexpenseForm";
import Filter from "../filter";
import { sub ,formatISO} from 'date-fns'

const PeriodicExpensesTable = (props) => {
  // const {userList}=prop
 
  const getAllPeriodicExpense = useBoundStore(
    (store) => store.getAllPeriodicExpense
  );
  const periodicExpenseList = useBoundStore((store) => store.periodicExpense);
  const deletePeriodicExpenses = useBoundStore(
    (store) => store.deletePeriodicExpense
  );
  const houseHoldList = useBoundStore((store) => store.households);
  const getAllHouseholds = useBoundStore((store) => store.getAllHouseholds);
  const [searchQuery, setSearchQuery] = useState("");
  const householdNames = houseHoldList.map(
    (eachHouseHold) => eachHouseHold.name
  );
  console.log(householdNames);
  useEffect(() => {
    getAllPeriodicExpense();
    getAllHouseholds();
  }, [getAllPeriodicExpense, getAllHouseholds]);

  const ondeletePeriodicExpense = (id) => {
    deletePeriodicExpenses(id);
  };
  const filteredPeriodicExpenseList = periodicExpenseList.filter((expense) =>
    householdNames.includes(expense.household)
  );
  // console.log(showFilter);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilter, SetshowFilter] = useState(false);
  const[filterName,setFilterName]=useState("Today");

  const onchecked = (value) => {
    // console.log(JSON.parse(value));
    const result = sub(new Date(), JSON.parse(value))
    const formattedresult = formatISO(result, { representation: 'date' })
    getAllPeriodicExpense(formattedresult);
    // console.log(formattedresult);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleFilterClose=()=>{
    SetshowFilter(false)
  }
  const getFilterName=(value)=>{
    setFilterName(value)
  }


  return (
    <>
      <PeriodicExpenseForm
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />

      <div className="flex flex-row justify-between">
        <div>
          <SearchInput onChange={(value) => setSearchQuery(value)} />
        </div>
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col ">
            <div  onClick={() => SetshowFilter(true)} className="flex flex-row border border-gray-100 rounded-md mr-4 mt-4 p-2">
            <FaFilter
             
              className="mt-5  text-blue-800"
            />
            <p className="mt-5 font-medium text-gray-800">{filterName}</p>
            </div>
           
            <Filter  handleonchecked={onchecked} showFilter={showFilter}  handleFilterClose={handleFilterClose} getFilterName={getFilterName}/> 
          </div>

          <button onClick={() => setIsModalOpen(true)}>
            <IoAddCircle className="text-blue-800 h-14 w-14" />
          </button>
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg ">
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
            {filteredPeriodicExpenseList
              .filter(
                (expense) =>
                  expense.selectExpense
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  expense.paidBy
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((eachPeriodicExpense) => (
                <tr
                  className="border-b bg-gray-50 "
                  key={eachPeriodicExpense._id}
                >
                  <td className="px-6 py-4">
                    {eachPeriodicExpense.dueDate.toString()}
                  </td>
                  <td className="px-6 py-4">
                    {eachPeriodicExpense.selectExpense}
                  </td>
                  <td className="px-6 py-4">{eachPeriodicExpense.paidBy}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-between">
                      <Link
                        to={`/primaryuser/periodicexpenses/${eachPeriodicExpense._id}`}
                        onClick={() => setIsModalOpen(true)}
                      >
                        <AiOutlineEdit className="w-8 h-6" />
                      </Link>
                      <AiOutlineDelete
                        onClick={() =>
                          ondeletePeriodicExpense(eachPeriodicExpense._id)
                        }
                        className="w-8 h-6 cursor-pointer"
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

export default PeriodicExpensesTable;
