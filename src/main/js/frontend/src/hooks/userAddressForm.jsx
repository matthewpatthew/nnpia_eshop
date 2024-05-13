import React, {useState} from "react";
import FormComponent from "../components/FormComponent.jsx";

const UserAddressForm = ({userData, handleUserDataChange, handleSubmit}) => {
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        formData.forEach((field) => {
            if (field.required && !userData[field.name]) {
                errors[field.name] = "This field is required";
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = () => {
        if (validateForm()) {
            handleSubmit();
        }
    };

    const formData = [
        {
            label: "First Name",
            type: "text",
            name: "firstName",
            value: userData.firstName,
            required: true,
        },
        {
            label: "Surname",
            type: "text",
            name: "surname",
            value: userData.surname,
            required: true,
        },
        {
            label: "Phone number",
            type: "text",
            name: "phoneNumber",
            value: userData.phoneNumber,
            required: true,
        },
        {
            label: "Email",
            type: "text",
            name: "email",
            value: userData.email,
            required: true,
        },
        {
            label: "Street",
            type: "text",
            name: "street",
            value: userData.street,
            required: true,
        },
        {
            label: "City",
            type: "text",
            name: "city",
            value: userData.city,
            required: true,
        },
        {
            label: "ZIP Code",
            type: "text",
            name: "zipCode",
            value: userData.zipCode,
            required: true,

        },
    ];

    return (
        <FormComponent
            formData={formData}
            handleDataChange={handleUserDataChange}
            handleSubmit={handleFormSubmit}
            formErrors={formErrors}
        />
    );
};
export default UserAddressForm;