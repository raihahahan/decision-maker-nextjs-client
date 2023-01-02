import Axios from "axios";
import { API_URL } from "../utils/globals";

let https = require("https");

export const axios = Axios.create({
    baseURL: API_URL,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    }),
});

axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const message = error.response?.data?.message || error.message;
      return Promise.reject(message);
    }
);