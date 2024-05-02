import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/products";
const token = Cookies.get("token");

export const listProducts = (page, size) => axios.get(REST_API_BASE_URL, {
    params: {page, size}
});

export const createProduct = (product) => axios.post(REST_API_BASE_URL, product, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getProduct = (id) => axios.get(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const updateProduct = (id, product) => axios.put(REST_API_BASE_URL + `/${id}`, product, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const deleteProduct = (id) => axios.delete(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const getCount = () => axios.get(REST_API_BASE_URL + "/count");