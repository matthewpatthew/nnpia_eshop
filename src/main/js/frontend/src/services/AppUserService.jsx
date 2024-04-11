import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:9000/api/v1/users/admin'

export const listAppUsers = () => {
    return axios.get(REST_API_BASE_URL)
}
