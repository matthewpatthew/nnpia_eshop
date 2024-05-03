import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/addresses";
const token = Cookies.get("token");

export const userAddress = (userId) => axios.get(REST_API_BASE_URL + `/${userId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateAddress = (userId, address) => axios.put(REST_API_BASE_URL + `/${userId}`, address, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});