import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from "../services/LoginService.jsx";
import {jwtDecode} from "jwt-decode";

const LoginComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginRequest = {username, password}
            const response = await login(loginRequest)
            const token = response.data.accessToken
            if (token) {
                const decodedToken = jwtDecode(token)
                localStorage.setItem('token', token)
                localStorage.setItem('userData', JSON.stringify(decodedToken));
                navigate('/products')
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginComponent
