import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const useAuth = () => {
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
        localStorage.clear()
        Cookies.remove("token");
        Cookies.remove("userRoles");
        Cookies.remove("loggedIn");
        Cookies.remove
        setLoggedIn(false);
        navigate("/login");
    };

    return {loggedIn, handleLogout};
};

export default useAuth;