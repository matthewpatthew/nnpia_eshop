import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/appusers";

export const listAppUsers = (page, size, sortBy, sortOrder) => axios.get(REST_API_BASE_URL, {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    },
    params: {page, size, sortBy, sortOrder}
});
export const getAppUser = (id) => axios.get(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
export const createAppUser = (appUser) => axios.post(REST_API_BASE_URL, appUser);
export const updateAppUser = (id, appUser) => axios.put(REST_API_BASE_URL + `/${id}`, appUser, {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
export const deleteAppUser = (id) => axios.delete(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
export const getCount = () => axios.get(REST_API_BASE_URL + "/count", {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
export const emailExists = (email) => axios.get(REST_API_BASE_URL + "/checkEmail",
    {params: {email}})

export const usernameExists = (username) => axios.get(REST_API_BASE_URL + "/checkUsername",
    {params: {username}})
