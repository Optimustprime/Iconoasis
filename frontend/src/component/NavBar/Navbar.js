import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../SignUp/axiosWithAuth';

export default function NavBar() {
    const [userInfo, setUserInfo] = useState(null);
    // const [error, setError] = useState(null);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axiosWithAuth.get('/user/me/', {

                });

                if (response.status === 200 || response.status === 201) {
                  setUserInfo(response.data.username)
                    // setUserInfo(userInfo)
                }else {
                    console.log('ori e ti gbale')
                }


                // Access the user info from the response data


                // Further processing of the user info
                // ...
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userInfo]);


    return (
        <div className="mainNav">
            <a href="https://akin125.github.io/iconoasis/" className="ss"><div className="nav">ICONOASIS</div></a>


            <div className="user">
                {userInfo}🥳
                        <Link to="/" className="ss">
                            <span id='jfbj'>Logout</span>
                        </Link>

                    {/*<Link to="/signup" className="ss">*/}
                    {/*    <span>Sign Up</span>*/}
                    {/*</Link>*/}
            </div>
        </div>
    );
}
