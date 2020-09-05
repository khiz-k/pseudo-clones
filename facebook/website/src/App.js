import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import Login from './auth/Login';
import {useStateValue} from './StateProvider';

function App() {
  const [user, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (<Login/>) : (
        <>
          <Header/>
          <div className="app__body">
            <Sidebar/>
            <Feed/>
            <Widgets/>
          </div>
       </>
      )}
    </div>
  );
}

export default App;
