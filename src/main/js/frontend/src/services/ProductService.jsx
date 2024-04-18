import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = 'http://localhost:9000/api/v1/products';
const token = Cookies.get('token');


export const listProducts = () => axios.get(REST_API_BASE_URL);

export const createProduct = (product) => axios.post(REST_API_BASE_URL, product, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});