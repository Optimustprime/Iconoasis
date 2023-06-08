import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SignUp/SignUpStyles.css";
import { Link } from "react-router-dom";
import axiosWithAuth from "../SignUp/axiosWithAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosWithAuth.post("/user/token/", {
                email,
                password,
            });

            if (response.status === 200 || response.status === 201) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                // Navigate to the home page after successful login
                navigate("/home");
                console.log(localStorage.getItem("token"))
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        }
        catch (error) {
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="loginContainer1">
            <div className="Name-1">LOGIN</div>
            <div className="loginContainer2">
                <div className="top-section">
                    <div className="Name">ICONOASIS</div>
                    <div className="text">Your one-stop icon destination</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        required={true}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        name="Email_Username"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        required={true}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <div>
                        <button className="submit" type="submit">
                            LOGIN
                        </button>
                    </div>
                    <div className="alt">
                        Don't have an account?
                        <Link to="/signup" className="sss">
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

