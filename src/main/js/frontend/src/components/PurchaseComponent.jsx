import React, {useEffect, useState} from "react";
import FormComponent from "./FormComponent.jsx";
import {updateAddress, userAddress} from "../services/AddressService.jsx";
import Cookies from "js-cookie";
import {getAppUser, updateAppUser} from "../services/AppUserService.jsx";
import {createPurchase} from "../services/PurchaseService.jsx";
import {useNavigate} from "react-router-dom";

const PurchaseComponent = () => {

    const navigator = useNavigate()

    const [userData, setUserData] = useState({
        firstName: "",
        surname: "",
        phoneNumber: "",
        email: "",
        street: "",
        city: "",
        zipCode: ""
    });

    const userId = Cookies.get("userId")

    useEffect(() => {
        loadUserAddress();
        loadUserCredentials();
    }, [])

    const loadUserAddress = async () => {
        try {
            const response = await userAddress(userId);
            const data = response.data;
            console.log(data)
            setUserData(prevUserData => ({
                ...prevUserData,
                street: data.street,
                city: data.city,
                zipCode: data.zipCode,
            }));
        } catch (error) {
            console.error("Error loading address");
        }
    };

    const loadUserCredentials = async () => {
        try {
            const response = await getAppUser(userId);
            const data = response.data;
            setUserData(prevUserData => ({
                ...prevUserData,
                firstName: data.firstName,
                surname: data.surname,
                phoneNumber: data.phoneNumber,
                email: data.email,
            }));
        } catch (error) {
            console.error("Error loading user data");
        }
    };

    const handleUserDataChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };
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
            <h5 className="text-center heading">Purchase details</h5>
            <FormComponent
                formData={[
                    {
                        label: "First Name",
                        type: "text",
                        name: "firstName",
                        value: userData.firstName,
                    },
                    {
                        label: "Surname",
                        type: "text",
                        name: "surname",
                        value: userData.surname,

                    },
                    {
                        label: "Phone number",
                        type: "text",
                        name: "phoneNumber",
                        value: userData.phoneNumber,
                    },
                    {
                        label: "Email",
                        type: "text",
                        name: "email",
                        value: userData.email,
                    },
                    {
                        label: "Street",
                        type: "text",
                        name: "street",
                        value: userData.street,
                    },
                    {
                        label: "City",
                        type: "text",
                        name: "city",
                        value: userData.city,
                    },
                    {
                        label: "ZIP Code",
                        type: "text",
                        name: "zipCode",
                        value: userData.zipCode,
                    },
                ]}
                handleDataChange={handleUserDataChange}
                handleSubmit={handleSubmit}/>
        </>
    );

};

export default PurchaseComponent;
