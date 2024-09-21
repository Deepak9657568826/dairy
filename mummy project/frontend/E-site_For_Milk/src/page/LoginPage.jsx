import React, { useState } from 'react';
import '../style/Login.css'; // Import the CSS file
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { loginfunction } from '../redux/actioncreator';
import { Button, Spinner  , useToast  } from '@chakra-ui/react';

function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const toast = useToast(); 

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true); 

        const fromData = {
            email,
            password
        };

        await dispatch(loginfunction(fromData, navigate , toast)); 

        setLoading(false); 
    }
   

    return (
        <div className="container">
            <div className="loginBox">
                <h2>लॉगिन</h2>
                <form onSubmit={handleLogin}>
                    <div className="textbox">
                        <input
                            type="email"
                            placeholder="ईमेल"
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="textbox">
                        <input
                            type="password"
                            placeholder="पासवर्ड"
                            required
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>

                    <Button colorScheme='blue' type="submit" className="btn" >
                        {loading ? (<Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='md'
                        />) : (
                            "लॉगिन")
                        }
                    </Button>

                    <p className="signup">खातं नाही? <Link to="/signup">साइन अप करण्यासाठी येथे क्लिक करा</Link></p>
                    </form>
            </div>
        </div>
    );
}

export default Loginpage;
