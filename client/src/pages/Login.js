import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import "../css/Login.css";


const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const auth = useAuth();

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            // Dispatch auth action here (or make an API call)
            auth.loginAction(input);
            return;
        } else {
            alert("Please provide both username and password.");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmitEvent} className="login-form">
                <h2>🔐 Welcome Back</h2>

                <div className="form-control">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={input.username}
                        onChange={handleInput}
                        required
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={input.password}
                        onChange={handleInput}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">Login</button>

                <div className="register-prompt">
                    Don’t have an account?{" "}
                    <Link to="/register" className="register-link">
                        Create one
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
