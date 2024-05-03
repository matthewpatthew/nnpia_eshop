import React, {useEffect, useState} from "react";
import FormComponent from "./FormComponent";


const ProfileComponent = () => {
    // State pro informace o uživateli
    const [userInfo, setUserInfo] = useState({});
    // State pro seznam objednávek
    const [orderHistory, setOrderHistory] = useState([]);

    // Funkce pro načtení informací o uživateli a seznamu objednávek po načtení komponenty
    useEffect(() => {

    }, []);

    // Funkce pro aktualizaci informací o uživateli
    const updateUserInfo = (updatedInfo) => {
        // Zde můžete implementovat zaslání aktualizovaných informací na server
        console.log("Updated user info:", updatedInfo);
        // Aktualizace stavu s novými informacemi
        setUserInfo(updatedInfo);
    };

    return (
        <div className="container">
            <h2>User Profile</h2>
            <div className="row">
                <div className="col-md-6">
                    <h3>User Information</h3>
                    <FormComponent
                        formData={[
                            {
                                label: "First Name",
                                type: "text",
                                name: "firstName",
                                value: "",
                            },
                            {
                                label: "Surname",
                                type: "text",
                                name: "surname",
                                value: "userData.surname"
                            }
                        ]}
                        handleDataChange={updateUserInfo}/>
                </div>
                <div className="col-md-6">
                    <h3>Order History</h3>
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
    )
        ;
};

export default ProfileComponent;
