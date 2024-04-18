import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const brandStyle = {
    fontFamily: "Mona Shark",
    fontSize: "40px ",
    color: "GOLD"
};

const itemStyle = {
    fontFamily: "Himagine",
    fontSize: "25px ",
};

const spaceStyle = {
    width: "40px"
};

const HeaderComponent = () => {
    const [loggedIn, setLoggedIn] = useState(Cookies.get("loggedIn") === "true");
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInCookie = Cookies.get("loggedIn");
        if (loggedInCookie === "true") {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('userRoles');
        Cookies.remove('loggedIn');
        setLoggedIn(false);
        navigate('/login');
    };

    return (
        <div>
            <header>
                <nav className='navbar navbar-dark bg-primary bg-black navbar-expand-lg'>
                    <a style={brandStyle} className='navbar-brand fw-bold m-2 ms-4'
                       href="http://localhost:3000/products">Eshop</a>

                    <div style={spaceStyle}></div>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a style={itemStyle} className="nav-link fw-bold"
                               href="http://localhost:3000/products">Products</a>
                        </li>
                        <li className="nav-item">
                            <a style={itemStyle} className="nav-link fw-bold" href="http://localhost:3000/cart">Cart</a>
                        </li>
                        <li className="nav-item">
                            <a style={itemStyle} className="nav-link fw-bold" href="#">Pricing</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-lg-auto me-3">
                        <li className="nav-item">
                            <a style={itemStyle} className="nav-link fw-bold"
                               href="http://localhost:3000/profile">Profile</a>
                        </li>
                        {loggedIn ? (
                            <li className="nav-item">
                                <a style={itemStyle} className="nav-link fw-bold" href="#"
                                   onClick={handleLogout}>Logout</a>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <a style={itemStyle} className="nav-link fw-bold"
                                   href="http://localhost:3000/login">Login</a>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
