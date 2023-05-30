
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";

import SearchInput from "../searchInput";
import { Link } from "react-router-dom";

const houseHoldList = [
  {
    _id: 1,
    name: "HouseHold Name 1",
    addressLine1: "HouseHold addressLine1 1",
    addressLine2: "HouseHold addressLine2 1",
    area: "HouseHold area 1",
    city: "HouseHold city 1",
    state: "HouseHold state 1",
    zipcode: "HouseHold zipcode 1",
  },
  {
    _id: 1,
    name: "HouseHold Name 2",
    addressLine1: "HouseHold addressLine1 2",
    addressLine2: "HouseHold addressLine2 2",
    area: "HouseHold area 2",
    city: "HouseHold city 2",
    state: "HouseHold state 2",
    zipcode: "HouseHold zipcode 2",
  },
];

const HouseholdTable = (props) => {
  // const {expenseList}=props
  return (
    <>
     <div className="flex flex-row justify-between">
        <div>
          <SearchInput />
        </div>
        <div>
        <Link to={"/primaryuser/householdform"}>
          <IoAddCircle className="text-blue-800 h-14 w-14" />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500  m-3 rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {houseHoldList.map((eachHousehold) => (
              <tr className="border-b bg-gray-50 " key={eachHousehold._id}>
                <td className="px-6 py-4">{eachHousehold.name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-between">
                    <AiOutlineEdit className="w-8 h-6" />
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

export default HouseholdTable;
