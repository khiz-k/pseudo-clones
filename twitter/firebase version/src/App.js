import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import "./App.css";

function App() {
  return (
    // BEM
    <div className="app">
      <Sidebar />
      <Feed />
      {/* <Widgets /> */}
    </div>
  );
}

export default App;
