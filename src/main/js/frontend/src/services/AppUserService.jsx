import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/appusers";
const token = Cookies.get("token");

export const listAppUsers = (page, size) => axios.get(REST_API_BASE_URL, {
    headers: {
        Authorization: `Bearer ${token}`
    },
    params: {page, size}
});
export const createAppUser = (appUser) => axios.post(REST_API_BASE_URL, appUser);
export const getAppUser = (id) => axios.get(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateAppUser = (appUser, id) => axios.put(REST_API_BASE_URL + `/${id}`, appUser, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const deleteAppUser = (id) => axios.delete(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getCount = () => axios.get(REST_API_BASE_URL + "/count", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
