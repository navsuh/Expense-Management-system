
import { AiOutlineDelete,AiOutlineEdit } from "react-icons/ai";

const expenseList=[{_id:1,name:"Expense type 1"},{_id:2,name:"Expense type 2"}]

const ExpenseTypeTable = (props) => {
    // const {expenseList}=props
    return ( <>
    
<div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg ml-6">
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
           
            
           
            {expenseList.map((eachExpense)=>
             <tr className="border-b bg-gray-50 " key={eachExpense._id}> 
            <td className="px-6 py-4" >
                   {eachExpense.name}
                </td>
                <td className="px-6 py-4" >
                   <div className="flex flex-between">
<AiOutlineEdit className="w-8 h-6"/>
<AiOutlineDelete className="w-8 h-6"/>
                   </div>
                </td>
                </tr>  )
                }
               
                
              
            
         
        </tbody>
    </table>
</div>

    
    </> );
}
 
export default ExpenseTypeTable;