import React, {useEffect, useState} from "react";
import {listRoles} from "../services/RolesService.jsx";
import {createAppUser, emailExists, getAppUser, updateAppUser, usernameExists} from "../services/AppUserService.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import Cookies from "js-cookie";
import validator from "validator/es";

const AppUserFormComponent = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        userRoles: [2], // Default role
        firstName: "",
        surname: "",
        phoneNumber: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        surname: "",
        phoneNumber: "",
        roles: ""
    });

    const [allRoles, setAllRoles] = useState([]);
    const {loggedIn} = useAuth();
    const {id} = useParams();
    const navigator = useNavigate();

    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };

    const handleInputChange = (key, value) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            [key]: value || ""
        }));
        if (key === "email") {
            checkEmailUniqueness(value).then((isUnique) => {
                if (!isUnique) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        email: "Email address already exists"
                    }));
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        email: ""
                    }));
                }
            }).catch(error => {
                console.log(error);
            });
        } else if (key === "username") {
            checkUsernameUniqueness(value).then((isUnique) => {
                if (!isUnique) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        username: "Username already exists"
                    }));
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        username: ""
                    }));
                }
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const checkEmailUniqueness = (email) => {
        return emailExists(email).then((response) => {
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    };

    const checkUsernameUniqueness = (username) => {
        return usernameExists(username).then((response) => {
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (isAdmin()) {
            listRoles().then((response) => {
                setAllRoles(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, []);

    useEffect(() => {
        if (id) {
            getAppUser(id).then((response) => {
                setUserData({
                    ...userData,
                    username: response.data.username,
                    email: response.data.email,
                    userRoles: response.data.roles.map(role => role.id),
                    firstName: response.data.firstName,
                    surname: response.data.surname,
                    phoneNumber: response.data.phoneNumber
                });

                allRoles.forEach(role => {
                    if (response.data.roles.some(r => r.id === role.id)) {
                        toggleRole(role.id);
                    }
                });
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateAppUser(e) {
        e.preventDefault();
        if (validateForm()) {
            if (id) {
                updateAppUser(id, userData).then(() => {
                    navigator("/appusers");
                });
            } else {
                createAppUser(userData).then(() => {
                    if (isAdmin()) {
                        navigator("/appusers");
                    } else {
                        alert("Successfully registered")
                        navigator("/login")
                    }
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};

        if (!validator.isEmail(userData.email.trim())) {
            errorsCopy.email = "Invalid email address";
            valid = false;
        } else {
            errorsCopy.email = "";
        }

        if (!validator.isLength(userData.username.trim(), {min: 1})) {
            errorsCopy.username = "Username is required";
            valid = false;
        } else {
            errorsCopy.username = "";
        }

        if (!isAdmin()) {
            if (!validator.isStrongPassword(userData.password.trim())) {
                errorsCopy.password = "Weak password";
                valid = false;
            } else {
                errorsCopy.password = "";
            }
        }


        if (loggedIn && !validator.isLength(userData.firstName.trim(), {min: 1})) {
            errorsCopy.firstName = "Firstname is required";
            valid = false;
        } else {
            errorsCopy.firstName = "";
        }

        if (loggedIn && !validator.isLength(userData.surname.trim(), {min: 1})) {
            errorsCopy.surname = "Surname is required";
            valid = false;
        } else {
            errorsCopy.surname = "";
        }

        if (loggedIn && !validator.isLength(userData.phoneNumber.trim(), {min: 1})) {
            errorsCopy.phoneNumber = "Phone number is required";
            valid = false;
        } else {
            errorsCopy.phoneNumber = "";
        }

        if (userData.userRoles.length === 0) {
            errorsCopy.roles = "At least one role must be selected";
            valid = false;
        } else {
            errorsCopy.roles = "";
        }

        setErrors(errorsCopy);
        return valid;
    }

    function toggleRole(roleId) {
        setUserData(prevUserData => {
            const userRoles = [...prevUserData.userRoles];
            const index = userRoles.indexOf(roleId);
            if (index !== -1) {
                userRoles.splice(index, 1);
            } else {
                userRoles.push(roleId);
            }
            return {...prevUserData, userRoles};
        });
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update AppUser</h2>;
        } else {
            return <h2 className="text-center">Register</h2>;
        }
    }

    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3 ">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text"
                                   className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                   value={userData.username || ""}
                                   onChange={(e) => handleInputChange("username", e.target.value)}/>
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text"
                                   className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                   value={userData.email || ""}
                                   onChange={(e) => handleInputChange("email", e.target.value)}/>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        {!loggedIn &&
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="text"
                                       className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                       value={userData.password || ""}
                                       onChange={(e) => handleInputChange("password", e.target.value)}/>
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                        }
                        {loggedIn &&
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label className="form-label">First name</label>
                                    <input type="text"
                                           className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                           value={userData.firstName || ""}
                                           onChange={(e) => handleInputChange("firstName", e.target.value)}/>
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Surname</label>
                                    <input type="text"
                                           className={`form-control ${errors.surname ? "is-invalid" : ""}`}
                                           value={userData.surname || ""}
                                           onChange={(e) => handleInputChange("surname", e.target.value)}/>
                                    {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone number</label>
                                    <input type="text"
                                           className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                                           value={userData.phoneNumber || ""}
                                           onChange={(e) => handleInputChange("phoneNumber", e.target.value)}/>
                                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                                </div>
                                <label className="form-label">Roles</label>
                                {allRoles.map(role => (
                                    <div key={role.id} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`role-${role.id}`}
                                            value={role.id}
                                            checked={userData.userRoles.includes(role.id)}
                                            onChange={() => toggleRole(role.id)}
                                        />
                                        <label className="form-check-label"
                                               htmlFor={`role-${role.id}`}>{role.name}</label>
                                    </div>
                                ))}
                            </div>
                        }
                        <div>
                            <button
                                className="btn btn-success mb-3 me-4" onClick={saveOrUpdateAppUser}>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppUserFormComponent;
