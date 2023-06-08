import React, {useEffect, useState} from "react";
import './SignUpStyles.css'
import axiosWithAuth from "../SignUp/axiosWithAuth";
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";

let formData = new FormData();

function SignUp(){
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameErrors] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const validatePassword = (event) => {
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            setFormValid(false);
        } else if (!password.match(/[a-z]/)) {
            setPasswordError("Password must contain at least one lowercase letter.");
            setFormValid(false);
        } else if (!password.match(/[A-Z]/)) {
            setPasswordError("Password must contain at least one uppercase letter.");
            setFormValid(false);
        } else if (!password.match(/\d/)) {
            setPasswordError("Password must contain at least one number.");
            setFormValid(false);
        } else if (!password.match(/[@$!%*.?&]/)) {
            setPasswordError("Password must contain at least one special character.");
            setFormValid(false);
        } else if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            setFormValid(false);
        } else {
            setPasswordError("");
            setFormValid(true);
        }
    };

    const validateUsername = (event) => {
        if (!username.match(/\d/)) {
            setUsernameErrors("Username can contain numbers");
            setFormValid(false);
        } else if (username.match(/^[-_.]+$/)) {
            setUsernameErrors('Username can only contain special characters as _, -, or .');
            setFormValid(false);
        } else if (!username.length > 16) {
            setUsernameErrors('Username must not exceed 16 characters') ;
            setFormValid(false);
        } else {
            setUsernameErrors("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        const storedUserName = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        validatePassword();
        validateUsername();

        if (storedUserName) {
            setUsername(storedUserName);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, [username, email]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        validatePassword();
    };


    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        validatePassword();
    };



    // function handleSubmit(event){
    //     event.preventDefault() //to remove the url log
    //     alert("Accepted!")
    // }

    // function handleChange(event){
    //    const {name , value} = event.target;
    //
    //    setLoginForm(prevState => (
    //        {
    //         ...prevState,
    //            [name] : value
    //        })
    //    )
    //
    // }



    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        validateUsername();
    };


    function uploadUserData() {
        const password = localStorage.getItem("password");
        const username = localStorage.getItem("username");
        const fullname = localStorage.getItem("fullName");
        const email = localStorage.getItem("email");

        formData.append("name", fullname);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        axiosWithAuth.post('user/create/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200 || response.status === 201) {
                    console.log("response 200")
                    // Navigate to the next screen or perform any action you need to take
                    // window.location.href = '/login';
                    navigate("/");
                    alert('Check your mail(spam) for the login link');

                } else {
                    // const errorDiv = document.querySelector('.passwordDetails');
                    // errorDiv.innerHTML = 'An error occurred while uploading user data. Please try again.';
                }
            })
            .catch((error) => {
                console.log(error);
                // const errorDiv = document.querySelector('.passwordDetails');
                // errorDiv.innerHTML = 'An error occurred while uploading user data. Please try again.';
                // errorDiv.style.color = 'red'; // sets the font color to red
                // errorDiv.style.fontSize = '18px'; // sets the font size to 18 pixels
            })
            .finally(() => console.log('alright'));
    }
    // const handleUserNameChange = (event) => {
    //     setFullName(event.target.value);
    // };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };


    //
    // const handleFinalSubmit = (event) => {
    //     event.preventDefault();
    //     localStorage.setItem("username", username);
    //     uploadUserData();
    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        localStorage.setItem("password", password);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("fullName", fullName);
        uploadUserData();
    }

  return(
      <div className='loginContainer1'>
          <div className="Name-1">Sign  Up</div>
      <div className='loginContainer2'>
      <div className="top-section">
        <div className="Name">ICONOASIS</div>
        <div className="text">Your one-stop icon destination</div>
      </div>

      <form onSubmit={handleSubmit}>

        <input type="text" placeholder='Full Name' required={true} onChange={handleFullNameChange} name='UserName' value={fullName}/>

        <input type="text" placeholder='Username' required={true} onChange={handleUsernameChange} name='UserName' value={username}/>
          {usernameError && (<div className='passwordDetails'>
              Username can contain only special character as _, - or .<br/>
              Username can contain numbers<br/>
              Username must not exceed 16 characters<br/>
          </div>)}
          {/*{!usernameError && <div className='passwordDetails'></div>}*/}
        <input type="email" placeholder='Email' required={true}  onChange={handleEmailChange}  name='Email' value={email}/>

        <input type="password" placeholder='Password' required={true}  onChange={handlePasswordChange} name='password' value={password}/>
          {passwordError && (
              <div className='passwordDetails'>At least 8 characters long<br/>A mixture of both UPPERCASE
                  and lowercase<br/>Must contain numbers<br/>Must include at least one special character,
                  e.g .,!@#^?</div>)}
          {/*{!passwordError && <div className='passwordDetails'></div>}*/}

        <input type="password" placeholder='Password' required={true} onChange={handleConfirmPasswordChange}  name='ConfirmPassword' value={confirmPassword}/>

          <div><button className="submit" disabled={!formValid} onClick={handleSubmit}> SIGN UP</button></div>
          <div className="alt">Already have an account? <Link to='/' className='sss'><span>Login</span></Link></div>
      </form>
      </div>
      </div>
  )
}

export default SignUp;


