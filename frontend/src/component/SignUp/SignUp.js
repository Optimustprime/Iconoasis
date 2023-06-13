import React, {  useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../SignUp/axiosWithAuth";
import "./SignUpStyles.css";

function SignUp() {

    const [name, setFullName] = useState("");
    const [toggle, setToggle] = useState(() => false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameErrors] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [username, setUsername] = useState("")
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [email, setEmail] = useState("");


    const validateUsername = () => {
        if (!username.match(/^\w+$/)) {
            setUsernameErrors("Username can only contain letters, numbers, and underscores.");
            setFormValid(false);
        } else if (username.length > 16) {
            setUsernameErrors("Username must not exceed 16 characters.");
            setFormValid(false);
        } else {
            setUsernameErrors("");
            setFormValid(true);
        }
    };

    const validatePassword = () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            setFormValid(false);
        }else if(password.length<5){
            setPasswordError("Ensure this field has at least 5 characters");
            setFormValid(false);
        }else{
            setPasswordError("");
            setFormValid(true);
        }
    };




    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);

    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    function handleError(errorMessage) {
        const errorDiv = document.querySelector('.passwordDetails');
        if (errorDiv) {
            errorDiv.innerHTML = errorMessage;
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '18px';
        }
    }

    function handleToggle() {

        if(!toggle){
            setToggle(() => true)
        }else{
            setToggle(() => false)
        }
    }




    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();



        // Perform additional validations here
        if (usernameError || passwordError) {
            alert('check credentials')
            return
        }
        axiosWithAuth
            .post('user/create/',
                {
                    name,
                    username,
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200 || response.status === 201) {
                    console.log("response 200");
                    setRegistrationSuccess(true)
                } else {
                    handleError("An error occurred while uploading user data. Please try again.");
                }
            })
            .catch((error) => {
                console.log(error);
                handleError("An error occurred while uploading user data. Please try again.");
            })
            .finally(() => console.log('alright'));


    };

    return (
        <div className="loginContainer1">
            <div className="Name-1">Sign Up</div>
            <div className="loginContainer2">
                <div className="top-section">
                    <div className="Name">ICONOASIS</div>
                    <div className="text">Your one-stop photo destination</div>
                </div>
                {
                    registrationSuccess ? <p className={'checkmail'}>Registration Successful. Check your mail (spam) for <Link className='link' to='/'>login</Link>  Authorization </p>
                        :

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        required={true}
                        onChange={handleFullNameChange}
                        name="UserName"
                        value={name}
                    />

                    <input
                        type="text"
                        onBlur={validateUsername}
                        placeholder="Username"
                        required={true}
                        onChange={handleUsernameChange}
                        name="UserName"
                        value={username}
                    />
                    {usernameError && (
                        <div className="passwordDetails">{usernameError}</div>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        required={true}
                        onChange={handleEmailChange}
                        name="Email"
                        value={email}
                    />

                    <div className="toggleee">
                        <input
                            onBlur={validatePassword}
                            type={toggle ? 'text' : 'password'}
                            placeholder="Password"
                            required={true}
                            onChange={handlePasswordChange}
                            name="password"

                        />
                        <div className={'yammm'} onClick={handleToggle}>{toggle ? '😃' : '😚'}</div>
                    </div>
                    {passwordError && (
                        <div className="passwordDetails">{passwordError}</div>
                    )}

                    <div className="toggleee">
                        <input
                            onBlur={validatePassword}
                            type={toggle ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            required={true}
                            onChange={handleConfirmPasswordChange}
                            name="ConfirmPassword"
                        />
                        <div className={'yammm'} onClick={handleToggle}>{toggle ? '😃' : '😚'}</div>
                    </div>
                    {passwordError && (
                        <div className="passwordDetails">{passwordError}</div>
                    )}


                    <div>
                        <button
                            className="submit"
                            disabled={!formValid}
                            onClick={handleSubmit}
                        >
                            SIGN UP
                        </button>
                    </div>
                    <div className="alt">
                        Already have an account?
                        <Link to="/" className="sss">
                            <span>Login</span>
                        </Link>
                    </div>
                </form>
                }
            </div>
        </div>
    );
}

export default SignUp;
