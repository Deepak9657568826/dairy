import React, { useState } from 'react';
import '../style/Login.css'; // Import the CSS file
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom"

function Signpage() {

    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")





    const navigate = useNavigate()
    const registerurl = `https://dairy-xesa.onrender.com/register`

    async function handlesignup(e) {
        e.preventDefault();
        const fromData = {
            name,
            email,
            password, 
            phoneNumber
        }
   

        // console.log(fromData);
        const response = await axios.post(registerurl, fromData)
        // console.log(response.data.Message);
        if( response.data.Message == `User with email ${email} is already register`){
            alert(`${response.data.Message}`)
        }
        else{

            alert(`User with email ${email} is register successfully}`)
            navigate("/login")
        }


    }

    return (
        <div className="container">
            <div className="loginBox">
                <h2>Register</h2>
                <form onSubmit={handlesignup}>

                    <div className="textbox">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            onChange={(e) => { setname(e.target.value) }}
                        />
                    </div>

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

                    <div className="textbox">
                        <input
                            type="number"
                            placeholder="PhoneNumber"
                            required
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                        />
                    </div>

                    <input
                        type="submit"
                        className="btn"
                        value="Signup"
                    />


                </form>
            </div>
        </div>
    );
}

export default Signpage;
