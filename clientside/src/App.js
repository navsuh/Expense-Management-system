import React, { useEffect } from "react";
import { useBoundStore } from "./store.js";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  useEffect(() => {
    useBoundStore.persist.clearStorage();
  }, []);
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
