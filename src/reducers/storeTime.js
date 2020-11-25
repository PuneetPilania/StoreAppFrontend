import {
    STORE_TIME
} from "../actions/types.js";

const initialState = {
    storeTime: [
        { day: "Monday", startTime: "", endTime: "" },
        { day: "Tuesday", startTime: "", endTime: "" },
        { day: "Wednesday", startTime: "", endTime: "" },
        { day: "Thrusday", startTime: "", endTime: "" },
        { day: "Friday", startTime: "", endTime: "" },
        { day: "Saturday", startTime: "", endTime: "" },
        { day: "Sunday", startTime: "", endTime: "" },
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {

        case STORE_TIME:
            return {
                ...state,
                storeTime: action.payload
            };


        default:
            return state;
    }
}
