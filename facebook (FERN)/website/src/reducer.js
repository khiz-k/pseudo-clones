// start/null user aka no user logged in
export const initialState = {
    user: null,
};

// action to set the user/ log in
export const actionTypes = {
    SET_USER: "SET_USER",
};

// logic, basically take whatever the current state looks like and switch it with your user
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };

            default: 
                return state;
    }
};

export default reducer;