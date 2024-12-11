import React, { createContext, useState, useContext } from "react";
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import {ToastContainer, toast, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = Cookies.get("jwtToken"); // Retrieve token from cookies
        return token ? jwtDecode(token) : null; // Decode the token if it exists
    });

    const handleLogin = (token) => {
        const decodedUser = jwtDecode(token);
        Cookies.set("jwtToken", token, { expires: 7, sameSite: "strict" }); // Set cookie for 7 days
        Cookies.set("refreshJwtToken", token, { expires: 14, sameSite: "strict" });
        setUser(decodedUser);

        // Show success message
        toast.success("Login successful!",{
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
            theme:"colored"
        });
    };

    const handleLogout = () => {
        Cookies.remove("jwtToken"); // Remove the cookie
        Cookies.remove("refreshJwtToken");
        setUser(null);

        // Show logout message
        toast.success("You have been logged out!",{
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
            theme:"colored"
        });
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
