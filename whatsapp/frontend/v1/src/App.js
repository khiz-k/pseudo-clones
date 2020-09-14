import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useStateProviderValue } from "./StateProvider";
import HomeScreen from "./components/Homescreen/HomeScreen";

function App() {
  const [{ user }, dispatch] = useStateProviderValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <HomeScreen />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
