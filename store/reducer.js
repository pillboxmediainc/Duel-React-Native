import { combineReducers } from 'redux';

const INITIAL_STATE = {
  socketConnection: false,
  shotsRemaining: 9,
  hitsToWin: 3,
};

//ACTION CONSTANTS
const SOCKET_TRUE = 'SOCKET_TRUE';
const SOCKET_FALSE = 'SOCKET_FALSE';

const INCREASE_SHOTS = 'INCREASE_SHOTS';
const DECREASE_SHOTS = 'DECREASE_SHOTS';

const INCREASE_HITS = 'INCREASE_HITS';
const DECREASE_HITS = 'DECREASE_HITS';

//ACTION CREATORS
export const socketTrue = () => ({ type: SOCKET_TRUE });
export const socketFalse = () => ({ type: SOCKET_FALSE });

export const increaseShots = () => ({ type: INCREASE_SHOTS });
export const decreaseShots = () => ({ type: DECREASE_SHOTS });

export const increaseHits = () => ({ type: INCREASE_HITS });
export const decreaseHits = () => ({ type: DECREASE_HITS });

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCKET_TRUE:
      return { ...state, socketConnection: true };
    case SOCKET_FALSE:
      return { ...state, socketConnection: false };
    case INCREASE_SHOTS:
      return { ...state, shotsRemaining: state.shotsRemaining + 1 };
    case DECREASE_SHOTS:
      return { ...state, shotsRemaining: state.shotsRemaining - 1 };
    case INCREASE_HITS:
      return { ...state, hitsToWin: state.hitsToWin + 1 };
    case DECREASE_HITS:
      return { ...state, hitsToWin: state.hitsToWin - 1 };
    default:
      return state;
  }
};

export default reducer;

// export default combineReducers({
//   friends: friendReducer,
// });
