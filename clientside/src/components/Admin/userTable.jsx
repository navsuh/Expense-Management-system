import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete,AiOutlineEdit } from "react-icons/ai";

const userList=[{_id:1,firstName:"user 1 fName",lastName:"user 1 lName",email:"user 1 email",
phone:"user 1 phone",userName:"user 1 userName",role:"user 1 role",lastLoggedIn:"user 1 lastLoggedIn",
isActive:true,updatedBy:"user 1 updatedBy",updatedAt:"user1 updatedAt"},
{_id:2,firstName:"user 2 fName",lastName:"user 2 lName",email:"user 2 email",
phone:"user 2 phone",userName:"user 2 userName",role:"user 2 role",lastLoggedIn:"user 2 lastLoggedIn",
isActive:true,updatedBy:"user 2 updatedBy",updatedAt:"user2 updatedAt"}

]

const UserTable = (props) => {
    // const {userList}=props
    return ( <>
    
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500  m-3 rounded-lg">
        <thead className="text-xs text-white uppercase bg-blue-500 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Full Name
                </th>
               
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           
            
           
            {userList.map((eachUser)=>
             <tr className="border-b bg-gray-50 " key={eachUser._id}> 
            <td className="px-6 py-4" >
                   {eachUser.firstName}
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
 
export default UserTable;