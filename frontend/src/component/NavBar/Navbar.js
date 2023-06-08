import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../SignUp/axiosWithAuth';

export default function NavBar() {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosWithAuth.get('/user/me/')
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    return (
        <div className="mainNav">
            <div className="nav">ICONOASIS</div>

            <div className="user">
                {userInfo}
                        <Link to="/" className="ss">
                            <span>Logout</span>
                        </Link>

                    {/*<Link to="/signup" className="ss">*/}
                    {/*    <span>Sign Up</span>*/}
                    {/*</Link>*/}
            </div>
        </div>
    );
}
