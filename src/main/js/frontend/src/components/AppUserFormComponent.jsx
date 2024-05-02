import React, {useEffect, useState} from "react";
import {listRoles} from "../services/RolesService.jsx";
import {createAppUser, getAppUser, updateAppUser} from "../services/AppUserService.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import Cookies from "js-cookie";


const AppUserFormComponent = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userRoles, setUserRoles] = useState([2]);

    const [allRoles, setAllRoles] = useState([]);
    const {loggedIn} = useAuth();

    const {id} = useParams();

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        roles: ""
    });

    const navigator = useNavigate();

    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };

    useEffect(() => {
        getAllRoles()
    }, []);

    useEffect(() => {
        if (id) {
            getAppUser(id).then((response) => {
                setUsername(response.data.username);
                setEmail(response.data.email);
                const roles = response.data.roles.map(role => role.id);
                setUserRoles(roles);
                allRoles.forEach(role => {
                    if (roles.includes(role.id)) {
                        toggleRole(role.id);
                    }
                });
            }).catch(error => {
                console.error(error);
            });
        }

    }, [id]);

    function getAllRoles() {
        if (isAdmin()) {
            listRoles().then((response) => {
                setAllRoles(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }

    function saveOrUpdateAppUser(e) {
        e.preventDefault();
        console.log(validateForm())
        if (validateForm()) {
            const appUser = {username, email, password, userRoles};
            console.log(appUser)

            if (id) {
                updateAppUser(appUser, id).then(r => {
                    navigator("/appusers");
                });
            } else {
                createAppUser(appUser).then((response) => {
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

        if (username.trim()) {
            errorsCopy.username = "";
        } else {
            errorsCopy.username = "Username is required";
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }

        if(!isAdmin()){
            if (password.trim()) {
                errorsCopy.password = "";
            } else {
                errorsCopy.password = "Password is required";
                valid = false;
            }
        }

        if (userRoles.length > 0) {
            errorsCopy.roles = "";
        } else {
            errorsCopy.roles = "At least one role must be selected";
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function toggleRole(roleId) {
        setUserRoles(prevSelectedRoles => {
            if (prevSelectedRoles.includes(roleId)) {
                return prevSelectedRoles.filter(id => id !== roleId);
            } else {
                return [...prevSelectedRoles, roleId];
            }
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
                        <div>
                            <label className="form-label">Username</label>
                            <input type="text"
                                   className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                   value={username}
                                   onChange={(e) => setUsername((e.target.value))}/>
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text"
                                   className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                   value={email}
                                   onChange={(e) => setEmail((e.target.value))}/>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        {!loggedIn &&
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="text"
                                       className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                       value={password}
                                       onChange={(e) => setPassword((e.target.value))}/>
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                        }
                        {loggedIn &&
                            <div className="mb-3">
                                <label className="form-label">Roles</label>
                                {allRoles.map(role => (
                                    <div key={role.id} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`role-${role.id}`}
                                            value={role.id}
                                            checked={userRoles.includes(role.id)}
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
