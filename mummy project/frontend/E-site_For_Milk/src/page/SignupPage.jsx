import React, { useState } from 'react';
import '../style/Login.css'; // Import the CSS file
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom"
import { Button, Spinner, useToast } from '@chakra-ui/react';

function Signpage() {

    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [loading, setLoading] = useState(false);

    const toast = useToast(); 



    const navigate = useNavigate()
    const registerurl = `https://dairy-xesa.onrender.com/register`

    async function handlesignup(e) {
        setLoading(true)
        e.preventDefault();
        const fromData = {
            name,
            email,
            password,
            phoneNumber
        }
        // console.log(fromData);
        const response = await axios.post(registerurl, fromData)
        console.log(response.data.Message);
        if (response.data.Message == `User with email id ${email} is already register`) {
            // alert(`${response.data.Message}`)
            toast({
                title: `Signup Failed`,
                description:`${response.data.Message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            setLoading(false)
        }
        else if ( response.data.Message==`New user with email id ${email} register successfull`)  {
             
            // alert(`User with email ${email} is register successfully}`)
            setLoading(false)
            toast({
                title: `User signup Successfull`,
                description:`${response.data.Message}`, 
                position: 'top-right',
                duration:5000,
                isClosable: `true`,
                status:`success`
              })
            navigate("/login")
        }


    }

    return (
        <div className="container">
            <div className="loginBox">
                <h2>नोंदणी</h2>
                <form onSubmit={handlesignup}>

                    <div className="textbox">
                        <input
                            type="text"
                            placeholder="पूर्ण नाव"
                            required
                            onChange={(e) => { setname(e.target.value) }}
                        />
                    </div>

                    <div className="textbox">
                        <input
                            type="email"
                            placeholder="ई-मेल"
                            required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="textbox">
                        <input
                            type="password"
                            placeholder="पासवर्ड तयार करा"
                            required
                            onChange={(e) => { setpassword(e.target.value) }}

                        />
                    </div>

                    <div className="textbox">
                        <input
                            type="number"
                            placeholder="फोन नंबर"
                            required
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                        />
                    </div>

                    {/* <input
                        type="submit"
                        className="btn"
                        value="Signup"
                    /> */}
                    <Button colorScheme='blue' type="submit" className="btn" >
                        {loading ? (<Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='md'
                        />) : (
                            "नोंदणी करा")
                        }
                    </Button>

                </form>
            </div>
        </div>
    );
}

export default Signpage;
