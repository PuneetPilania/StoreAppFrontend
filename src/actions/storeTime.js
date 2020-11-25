import axios from "axios";
import {
    STORE_TIME
} from "./types";

//LOGOUT
export const changeTime = (data) => (dispatch) => {

    dispatch({
        type: STORE_TIME,
        payload: data
    });
};
