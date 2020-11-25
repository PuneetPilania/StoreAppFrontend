// export const host = "http://127.0.0.1:8000";
export const host = "https://store-our.herokuapp.com";


const apiURL = "/api";

const apiAuthUrl = "/api/auth";

export const endpoint = `${host}${apiURL}`;

export const endpointForAuth = `${host}${apiAuthUrl}`;

export const createStore = `${endpointForAuth}/createStore`;
export const getStore = `${endpointForAuth}/getStore`;
export const getProduct = `${endpointForAuth}/getProduct`;