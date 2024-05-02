import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../services/LoginService.jsx";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";


const LoginFormComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginRequest = {username, password};
            const response = await login(loginRequest);
            const token = response.data.accessToken;
            if (token) {
                const decodedToken = jwtDecode(token);
                Cookies.set("token", token, {expires: 1});
                Cookies.set("userId", decodedToken.sub, {expires: 1});
                Cookies.set("userRoles", JSON.stringify(decodedToken.a), {expires: 1});
                Cookies.set("loggedIn", true, {expires: 1});
                navigate("/products");
            }
        } catch (error) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="card col-md-4 offset-md-4">
                    <h2 className="text-center">Login</h2>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text"
                                   value={username}
                                   className="form-control"
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <label className="form-label">Password</label>
                                <Link to="/register">Forgotten password?</Link>
                            </div>
                            <input type="password"
                                   value={password}
                                   className="form-control"
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button
                                className="btn btn-success"
                                onClick={handleLogin}>Login
                            </button>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginFormComponent;
