import axios from "axios";
import { endpoint } from "./constants";

export const authAxios = (token) =>
  axios.create({
    baseURL: endpoint,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

export const guestAxios = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
  },
});