import React, {useState, createContext, useEffect} from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [authToken, setAuthToken] = useState(existingToken);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");

    const setToken = (token) => {
        localStorage.setItem("token", token);
        setAuthToken(token);
    };

    useEffect(() => {
        setIsAuthenticated(!!authToken);
    }, [authToken]);


    const authenticate = async (username, password) => {
        const result = await login(username, password);
        if (result.token) {
            setToken(result.token)
            setUserName(username);
        }
    };



    const register = async (username, password) => {
        try {
            const result = await signup(username, password);

            if (result.success) {
                console.log("Registration successful");
                return true;
            } else {
                console.error("Registration failed:", result.msg);
                throw new Error(result.msg || "Registration failed. Try again.");
            }
        } catch (error) {
            console.error("Registration error:", error.message);
            throw error;
        }
    };

    const signOut = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setIsAuthenticated(false);
        setUserName("");
    };



    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                register,
                signOut,
                userName,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
