import {getAppUser} from "../services/AppUserService.jsx";
import {useEffect, useState} from "react";
import {userAddress} from "../services/AddressService.jsx";

const useUserData = (userId) => {
    const [userData, setUserData] = useState({
        firstName: "",
        surname: "",
        phoneNumber: "",
        email: "",
        street: "",
        city: "",
        zipCode: ""
    });

    useEffect(() => {
        loadUserAddress();
        loadUserCredentials();
    }, [])

    const loadUserAddress = async () => {
        try {
            const response = await userAddress(userId);
            const data = response.data;
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
    return {userData, handleUserDataChange};
}

export default useUserData;