import FormComponent from "../components/FormComponent.jsx";

const UserForm = ({ userData, handleUserDataChange, handleSubmit }) => (
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
        handleSubmit={handleSubmit}
    />
);

export default UserForm;