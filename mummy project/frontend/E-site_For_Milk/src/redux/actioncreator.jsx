import axios from "axios"
import { LOGINFAILURE, LOGINLOADING, LOGINSUCCESS, LOGOUTFAILURE, LOGOUTLOADING, LOGOUTSUCCESS } from "./actionType"

//  login function 
const loginrurl = `https://dairy-xesa.onrender.com/login`

export function loginfunction(fromData, navigate , toast ) {
    return async (dispatch) => {
        dispatch({ type: LOGINLOADING })
        try {
            const response = await axios.post(loginrurl, fromData)

            if (response.data.Message == `User with email id ${fromData.email} is not  register`) {
                dispatch({ type: LOGINFAILURE, payload: response.data.Message })
              
                // alert(`${response.data.Message}`)
                toast({
                    title: `Login Failed`,
                    description:`$तुमचे लॉगिन अयशस्वी झाले आहे. कृपया पुन्हा प्रयत्न करा.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });


            }
            else if (response.data.Message == `Password is not correct`) {
                dispatch({ type: LOGINFAILURE, payload: response.data.Message })
               
                toast({
                    title: `${response.data.Message}`,
                    description: `तुमचे लॉगिन अयशस्वी झाले आहे. कृपया पुन्हा प्रयत्न करा.`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
            else {
                    
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.user));

                
                dispatch({ type: LOGINSUCCESS, payload: response.data })
                
                toast({
                    title: `Login successfull`,
                    description: `तुमचे लॉगिन यशस्वी झाले आहे!`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });

               await navigate("/")
            }
        } catch (error) {
            dispatch({ type: LOGINFAILURE, payload: error.message })
            toast({
                title: `${error.message}`,
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        }
    }
}


// for logout 

const logouturl = `https://dairy-xesa.onrender.com/logout`
const authorization = localStorage.getItem("token")

export function logoutfunction(navigate , toast) {

    return async (dispatch) => {
        dispatch({ type: LOGOUTLOADING })
        try {
            const response = await axios.get(logouturl, {
                headers:{
                    authorization
                }
            })

            if (response.data.Message == `User logout successfull`) {
                
                dispatch({ type: LOGOUTSUCCESS, payload: response.data })
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                toast({
                    title: `Logout successfully`,
                    description: `तुमचे लॉगआउट यशस्वीपणे झाले आहे!`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right',
                });
                // alert("user logout successfully")
                navigate("/login")
            }

        } catch (error) {
            dispatch({ type: LOGOUTFAILURE, payload: error.message })
            toast({
                title: `${error.message}`,
                description: `तुमचे लॉगिन अयशस्वी झाले आहे. कृपया पुन्हा प्रयत्न करा.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });

        }
    }
}
