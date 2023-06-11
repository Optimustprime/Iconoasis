import React, {useEffect} from "react";
import Home from "./component/Home";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import SignUp from "./component/SignUp/SignUp";
import Login from "./component/Login/Login";

function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(null)

    useEffect(
        function checkAuth (){
            const userToken = localStorage.getItem('dummy');

            if(userToken){
                setIsAuthenticated(true)
            }else {
                setIsAuthenticated(false)
            }

        },[isAuthenticated]
    )

    const handleRefreshClick = () => {
        window.location.reload();

    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/home"
                    element={
                        isAuthenticated ? (
                            <Home />
                        ) : (
                            <div className='beast'>
                                <h2>😬No panic😬</h2>
                                {/*<p>You must be*/}
                                {/*     <Link to='/' className='sss'>logged</Link> in to view this page. or Sign up*/}
                                {/*    <Link className='sss' to='/signup'>here</Link>*/}
                                {/*</p>*/}

                                {/*<h4 id={'ydy'}>Kindly Refresh</h4>*/}

                                <Link to='/home' className='sss'> <button onClick={handleRefreshClick}>Click to Continue</button></Link>

                            </div>
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
