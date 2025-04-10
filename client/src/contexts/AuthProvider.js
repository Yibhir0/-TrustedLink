import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem("site-token") || "");
    const [currentUser, setUser] = useState(() => {
        const savedUser = localStorage.getItem("site-user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const loginAction = async (credentials) => {
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const res = await response.json();

            if (response.ok && res.token && res.user) {
                setUser(res.user);
                setToken(res.token);

                // ✅ Save user and token
                localStorage.setItem("site-token", res.token);
                localStorage.setItem("site-user", JSON.stringify(res.user));

                navigate("/");
            } else {
                throw new Error(res.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err.message);
            alert(err.message);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site-token");
        localStorage.removeItem("site-user");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, currentUser, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
