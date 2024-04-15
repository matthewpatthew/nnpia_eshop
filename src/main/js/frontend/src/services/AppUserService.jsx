import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:9000/api/v1/appusers'
const token = localStorage.getItem('token')
console.log(token)

const listAppUsers = () => {
    if (token !== null) {
        return axios.get(REST_API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } else {
        return axios.get(REST_API_BASE_URL);
    }
};


export const createAppUser = (appUser) => axios.post(REST_API_BASE_URL, appUser, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export {listAppUsers}
