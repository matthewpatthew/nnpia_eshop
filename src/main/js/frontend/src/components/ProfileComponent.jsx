import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import useUserData from "../hooks/useUserData.jsx";
import {updateAppUser} from "../services/AppUserService.jsx";
import {updateAddress} from "../services/AddressService.jsx";
import UserAddressForm from "../hooks/userAddressForm.jsx";
import {listProducts} from "../services/ProductService.jsx";
import {listPurchases} from "../services/PurchaseService.jsx";

const ProfileComponent = () => {
    const [purchases, setPurchases] = useState([]);
    const userId = Cookies.get("userId");
    const {userData, handleUserDataChange} = useUserData(userId);

    const handleSubmit = async (e) => {
        try {
            await updateAppUser(userId, userData);
            await updateAddress(userId, userData)
            alert("Account details updated")

        } catch (error) {
            console.error("Error updating account details:", error);
        }
    };

    useEffect(() => {
        getPurchases();
    }, []);

    async function getPurchases() {
        try {
            const response = await listPurchases(userId);
            setPurchases(response.data);
            console.log(purchases)
        } catch (error) {
            console.error("Error fetching purchases:", error);
        }
    }
    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center just">
                <div className="col-md-4">
                    <br/>
                    <h2 className="text-center heading">User Information</h2>
                    <UserAddressForm
                        userData={userData}
                        handleUserDataChange={handleUserDataChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="col-md-4 offset-md-1">
                    <br/>
                    <h3 className="text-center heading ">Order History</h3>
                    <br/>
                    <table className="table table-bordered table-responsive">
                        <thead>
                        <tr className="text-center">
                            <th >Order number</th>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {purchases.map((purchase) => (
                            <tr key={purchase.id}>
                                <td>{purchase.id}</td>
                                <td>{formatDateTime(purchase.creationDate)}</td>
                                <td>{purchase.totalPrice}$</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;
