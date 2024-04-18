import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = 'http://localhost:9000/api/v1/roles';
const token = Cookies.get('token');

export const listRoles = () => axios.get(REST_API_BASE_URL, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});