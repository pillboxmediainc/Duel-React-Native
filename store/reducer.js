import { combineReducers } from 'redux';

const INITIAL_STATE = {
  socketConnection: true,
  shotsRemaining: 5,
};

//ACTION CONSTANTS
const SOCKET_TRUE = 'SOCKET_TRUE';
const SOCKET_FALSE = 'SOCKET_FALSE';

//ACTION CREATORS
export const socketTrue = () => ({ type: SOCKET_TRUE });
export const socketFalse = () => ({ type: SOCKET_FALSE });

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCKET_TRUE:
      return { ...state, socketConnection: true };
    case SOCKET_FALSE:
      return { ...state, socketConnection: false };
    default:
      return state;
  }
};

export default reducer;

// export default combineReducers({
//   friends: friendReducer,
// });
