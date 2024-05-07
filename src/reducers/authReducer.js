// reducers/authReducer.js
const initialState = {
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        userData: null,
      };
    case 'UPDATE_DETAIL':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;