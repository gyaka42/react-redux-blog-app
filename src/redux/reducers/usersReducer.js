import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: false,
  success: false,
  users: [],
  error: false,
  errorMessage: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.userActions.GET_USERS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.userActions.GET_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        error: false,
        users: action.payload,
      };
    case actionTypes.userActions.GET_USERS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
