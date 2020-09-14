import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import "./Sidebar.css";
import MenuIcon from "@material-ui/icons/Menu";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import UseWindowDimensions from "../../UseWindowDimensions";
import Loader from "../Loader/Loader";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [{ togglerState }, dispatch] = useStateValue();
  const { width } = UseWindowDimensions();
  useEffect(() => {
    //  console.log(db)
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setToggler(!toggler);
  }, [togglerState]);
  const handleDrawerToggle = () => {
    setToggler(toggler);

    dispatch({
      type: actionTypes.SET_TOGGLER,
      togglerState: togglerState + 1,
    });
  };
  const photoURL =
    localStorage.getItem("photoURL") !== ""
      ? localStorage.getItem("photoURL")
      : null;
  const displayName = localStorage.getItem("displayName");
  //  console.log(toggler,togglerState);

  return (
    <>
      {width < 629 ? (
        <div
          className={
            togglerState % 2 !== 0 ? "sidebar" : "sidebar hide__sidebar"
          }
        >
          <div className="sidebar__wrapper">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className="sidebar__burger"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <div className="sidebar__header">
              <Avatar src={photoURL} />
              <div className="sidebar__headerRight">
                <IconButton>
                  <DonutLargeIcon />
                </IconButton>
                <IconButton>
                  <ChatIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input placeholder="Search or Start a new chat" type="text" />
            </div>
          </div>
          <div className="sidebar__chats">
            <SidebarChat addNewChatVal="true" />
            {rooms.map((room) => (
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
          </div>
          {/* <SidebarCharList rooms={rooms}/> */}
        </div>
      ) : (
        <div className={"sidebar"}>
          <div className="sidebar__header">
            <Avatar src={photoURL} /> <p className="sidebar__greeting">{}</p>
            <div className="sidebar__headerRight">
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input placeholder="Search or Start a new chat" type="text" />
            </div>
          </div>
          <div className="sidebar__chats">
            <SidebarChat addNewChatVal="true" />
            {rooms.length == 0 ? (
              <Loader />
            ) : (
              rooms.map((room) => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
              ))
            )}
          </div>
          {/* <SidebarCharList rooms={rooms}/> */}
        </div>
      )}
    </>
  );
}

export default Sidebar;
