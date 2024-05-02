import axios from "axios";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:9000/api/v1/purchases";
const token = Cookies.get("token");

export const createPurchase = (purchaseData) => axios.post(REST_API_BASE_URL, purchaseData, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});