import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
import { host } from "../constants"

//Cheak Token and load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${host}/api/auth/user`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (username, password) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body
  const body = JSON.stringify({ username, password });
  console.log(body);

  axios
    .post(`${host}/api/auth/login`, body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: LOGIN_FAIL,
        payload: errors
      });
    });
};

//REGISTER
export const profileRegister = ({
  username,
  email,
  password,
  post,
  firstName,
  lastName,
  phoneNo,
  address,
  country,
  state,
  policeStationRange,
  district,
  workState,
  workPoliceStationRange,
  workDistrict
}) => (dispatch, getState) => {
  // Request Body
  const body = JSON.stringify({
    username,
    email,
    password,
    post,
    firstName,
    lastName,
    phoneNo,
    address,
    country,
    state,
    policeStationRange,
    district,
    workState,
    workPoliceStationRange,
    workDistrict
  });
  console.log(body);

  axios
    .post(
      `${host}//api/auth/profileRegister`,
      body,
      tokenConfig(getState)
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: REGISTER_SUCCESS
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: REGISTER_FAIL,
        payload: errors
      });
    });
};

//LOGOUT
export const logout = () => (dispatch, getState) => {
  axios
    .post(`${host}//api/auth/logout`, null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const tokenConfig = getState => {
  //GET TOKEN FROM STATE
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //if token , add to header config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
