import React, {useEffect, useState} from "react";
import FormComponent from "./FormComponent.jsx";
import {userAddress} from "../services/AddressService.jsx";
import Cookies from "js-cookie";
import {getAppUser} from "../services/AppUserService.jsx";
import {createPurchase} from "../services/PurchaseService.jsx";

const PurchaseComponent = () => {
        const [userData, setUserData] = useState({
            firstName: "",
            surname: "",
            phoneNumber: "",
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
            console.log(data)
            setUserData(prevUserData => ({
                ...prevUserData,
                firstName: data.firstName,
                surname: data.surname,
                phoneNumber: data.phoneNumber,
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

                console.log(cartData)

                const productInfo = cartData ? cartData.map(item => ({
                    productId: item.productId,
                    count: item.quantity
                })) : [];

                const totalPrice = parseInt(localStorage.getItem("totalPrice"));

                console.log(totalPrice)

                const purchaseData = {
                    userId: userId,
                    productInfo: productInfo,
                    totalPrice: totalPrice
                };

                console.log(purchaseData)

                await createPurchase(purchaseData);

                updateUserData()

                console.log("Purchase successfully created");

            } catch (error) {
                console.error("Error creating purchase:", error);
            }
        };

        return (
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
                handleSubmit={handleSubmit}
            />
        );
    };

export default PurchaseComponent;
