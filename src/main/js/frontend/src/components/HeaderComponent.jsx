import React from "react";
import useAuth from "../hooks/useAuth.jsx";
import Cookies from "js-cookie";

const brandStyle = {
    fontFamily: "Arial",
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
    const {loggedIn, handleLogout} = useAuth();

    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-dark bg-primary bg-black navbar-expand-lg">
                    <a style={brandStyle} className="navbar-brand fw-bold m-2 ms-4"
                       href="http://localhost:3000/products">Eshop</a>

                    <div style={spaceStyle}></div>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a style={itemStyle} className="nav-link fw-bold"
                               href="http://localhost:3000/products">Products</a>
                        </li>
                        {loggedIn &&
                            <>
                                <li className="nav-item">
                                    <a style={itemStyle} className="nav-link fw-bold"
                                       href="http://localhost:3000/cart">Cart</a>
                                </li>
                            </>
                        }
                    </ul>
                    {isAdmin() &&
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a style={itemStyle} className="nav-link fw-bold"
                                   href="http://localhost:3000/appusers">AppUsers</a>
                            </li>
                        </ul>
                    }
                    <ul className="navbar-nav ms-lg-auto me-3">
                        {loggedIn ? (
                            <>
                                <li className="nav-item">
                                    <a style={itemStyle} className="nav-link fw-bold"
                                       href="http://localhost:3000/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a style={itemStyle} className="nav-link fw-bold" href="#"
                                       onClick={handleLogout}>Logout</a>
                                </li>
                            </>

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
