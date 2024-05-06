import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/products";

export const listProducts = (page, size, sortBy, sortOrder) => axios.get(REST_API_BASE_URL, {
    params: {page, size, sortBy, sortOrder}
});

export const createProduct = (product) => axios.post(REST_API_BASE_URL, product, {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
export const getProduct = (id) => axios.get(REST_API_BASE_URL + `/${id}`)
export const updateProduct = (id, product) => axios.put(REST_API_BASE_URL + `/${id}`, product, {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
export const deleteProduct = (id) => axios.delete(REST_API_BASE_URL + `/${id}`, {
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
export const getCount = () => axios.get(REST_API_BASE_URL + "/count");