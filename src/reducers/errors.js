import { LOGIN_FAIL, REGISTER_FAIL } from "../actions/types";

const initialState = {
  msg: {},
  status: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    default:
      return state;
  }
}
