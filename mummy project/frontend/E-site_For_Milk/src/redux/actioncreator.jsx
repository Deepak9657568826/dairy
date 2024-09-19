import axios from "axios"
import { LOGINFAILURE, LOGINLOADING, LOGINSUCCESS, LOGOUTFAILURE, LOGOUTLOADING, LOGOUTSUCCESS } from "./actionType"

//  login function 
const loginrurl = `https://dairy-xesa.onrender.com/login`

export function loginfunction(fromData, navigate , login) {
    return async (dispatch) => {
        dispatch({ type: LOGINLOADING })
        try {
            const response = await axios.post(loginrurl, fromData)
            // console.log(response.data);

            if (response.data.Message == `User with email id ${fromData.email} is not  register`) {
                dispatch({ type: LOGINFAILURE, payload: response.data.Message })
                alert(`${response.data.Message}`)
            }
            else if (response.data.Message == `Password is not correct`) {
                dispatch({ type: LOGINFAILURE, payload: response.data.Message })
                alert(`${response.data.Message}`)
            }
            else {
                    // console.log(response.data);
                    
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.user));

                
                dispatch({ type: LOGINSUCCESS, payload: response.data })
                alert(`${response.data.Message}`)
                navigate("/")
            }
        } catch (error) {
            dispatch({ type: LOGINFAILURE, payload: error.message })
        }
    }
}


// for logout 

const logouturl = `https://dairy-xesa.onrender.com/logout`
const authorization = localStorage.getItem("token")

export function logoutfunction(navigate) {
    console.log("Come in logout function");
    
    return async (dispatch) => {
        dispatch({ type: LOGOUTLOADING })
        try {
            const response = await axios.get(logouturl, {
                headers:{
                    authorization
                }
            })
            console.log(response.data);

            if (response.data.Message == `User logout successfull`) {
                console.log("enter in if bock");
                
                dispatch({ type: LOGOUTSUCCESS, payload: response.data })
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                alert("user logout successfully")
                navigate("/login")
            }

        } catch (error) {
            dispatch({ type: LOGOUTFAILURE, payload: error.message })
        }
    }
}
