import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:9000/api/v1/roles/admin'

export const listRoles = () => {
    return axios.get(REST_API_BASE_URL)
}
