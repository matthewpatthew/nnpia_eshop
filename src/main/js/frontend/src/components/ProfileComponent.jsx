import React, {useState} from "react";
import Cookies from "js-cookie";
import useUserData from "../hooks/useUserData.jsx";
import {updateAppUser} from "../services/AppUserService.jsx";
import {updateAddress} from "../services/AddressService.jsx";
import UserForm from "../hooks/UserForm.jsx";

const ProfileComponent = () => {
    const [orderHistory, setOrderHistory] = useState([]);
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


    return (
        <div className="container">
            <div className="row d-flex justify-content-center just">
                <div className="col-md-4">
                    <br/>
                    <h2 className="text-center heading">User Information</h2>
                    <UserForm
                        userData={userData}
                        handleUserDataChange={handleUserDataChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="col-md-4 offset-md-1">
                    <br/>
                    <h3 className="text-center heading ">Order History</h3>
                    <br/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderHistory.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.total}</td>
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
