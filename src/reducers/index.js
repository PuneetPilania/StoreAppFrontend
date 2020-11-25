import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import storeTime from "./storeTime";

export default combineReducers({
  errors,
  storeTime,
  auth
});
