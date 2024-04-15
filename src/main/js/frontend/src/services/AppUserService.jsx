import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:9000/api/v1/users'
const token = localStorage.getItem('token')
export const listAppUsers = () => axios.get(REST_API_BASE_URL, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
export const createAppUser = (appUser) => axios.post(REST_API_BASE_URL, appUser, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
