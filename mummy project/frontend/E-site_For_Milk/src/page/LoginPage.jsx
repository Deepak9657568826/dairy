import React, { useState } from 'react';
import '../style/Login.css'; // Import the CSS file
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginfunction } from '../redux/actioncreator';


function Loginpage() {

    const [email, setEmail] = useState("")

    const [password, setpassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    // console.log(state);

    async function handleLogin(e) {
        e.preventDefault();
        const fromData = {
            email,
            password
        }
        dispatch(loginfunction(fromData, navigate  , state.isLoggedIn))
    }


    return (
        <div className="container">
            <div className="loginBox">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="textbox">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="textbox">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => { setpassword(e.target.value) }}

                        />
                    </div>

                    <input
                        type="submit"
                        className="btn"
                        value="Login"
                    />

                    <p className="signup">Not a account? <Link to="/signup">click here Sign up</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Loginpage;

