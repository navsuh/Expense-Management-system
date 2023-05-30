import { IoAddCircle } from "react-icons/io5";

import SearchInput from "./searchInput";
import { Link } from "react-router-dom";
const Tablist = (props) => {
    const {tabList}=props
  return (
    <>
      
        <div class="p-4   rounded-lg">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              
              {tabList.map((eachTabItem)=><li className="mr-2" key={eachTabItem._id}>
                <Link
                  to={eachTabItem.tabPath}
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                >
                  {eachTabItem.tabName}
                </Link>
              </li>
              )}
              
             
            </ul>
          </div>
         
        </div>
        <div className="flex flex-row justify-between">
            <div><SearchInput /></div>
        <div><IoAddCircle className="text-blue-800 h-14 w-14"/></div>
        

        </div>
        
    
    </>
  );
};

export default Tablist;
