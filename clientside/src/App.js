import {
  Outlet
} from "react-router-dom";
import './App.css';




function App() {
  return (
    <div className="App">
     {/* <Sidebar /> */}
     <div className="p-4 sm:ml-64">
        
    <Outlet/>
    </div>
    </div>
  );
}

export default App;