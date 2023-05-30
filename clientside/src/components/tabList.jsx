
import { NavLink } from "react-router-dom";
const Tablist = (props) => {
    const {tabList}=props
  return (
    <>
      
        <div class="p-4   rounded-lg">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
            <ul className="flex flex-wrap -mb-px">
              
              {tabList.map((eachTabItem)=><li className="mr-2" key={eachTabItem._id} >
                <NavLink 
                  to={eachTabItem.tabPath}
                  
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
                >
                  {eachTabItem.tabName}
                </NavLink>
              </li>
              )}
              
             
            </ul>
          </div>
         
        </div>
      
        
    
    </>
  );
};

export default Tablist;
