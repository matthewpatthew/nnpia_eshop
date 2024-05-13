import React from "react";
import FormComponent from "./FormComponent.jsx";
import {updateAddress} from "../services/AddressService.jsx";
import Cookies from "js-cookie";
import {updateAppUser} from "../services/AppUserService.jsx";
import {createPurchase} from "../services/PurchaseService.jsx";
import {useNavigate} from "react-router-dom";
import useUserData from "../hooks/useUserData.jsx";
import UserAddressForm from "../hooks/userAddressForm.jsx";

const PurchaseComponent = () => {

    const navigator = useNavigate()

    const userId = Cookies.get("userId");
    const {userData, handleUserDataChange} = useUserData(userId);

    const handleSubmit = async (e) => {
        try {
            const cartData = JSON.parse(localStorage.getItem("cart"));

            const productInfo = cartData ? cartData.map(item => ({
                productId: item.productId,
                count: item.quantity
            })) : [];

            const totalPrice = parseInt(localStorage.getItem("totalPrice"));

            const purchaseData = {
                userId: userId,
                productInfo: productInfo,
                totalPrice: totalPrice
            };

            await createPurchase(purchaseData);
            await updateAppUser(userId, userData);
            await updateAddress(userId, userData)

            navigator("/order-completed")

        } catch (error) {
            console.error("Error creating purchase:", error);
        }
    };

    return (
        <>
            <br/>
            <div className="col-md-3 offset-md-5">
                <h5 className="heading text-center">Purchase details</h5>
                <UserAddressForm
                    userData={userData}
                    handleUserDataChange={handleUserDataChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    );

};

export default PurchaseComponent;
