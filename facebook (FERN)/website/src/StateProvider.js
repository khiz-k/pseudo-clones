import React, { createContext, useContext, useReducer } from "react";

//prepare data layer
export const StateContext = createContext();

// higher order component to wrap the app
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider>
);

// pull from data layer
export const useStateValue = () => useContext(StateContext);