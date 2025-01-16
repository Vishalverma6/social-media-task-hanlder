import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";

const { endpoints } = require("../apis");



const {
    SIGNUP_API,
    LOGIN_API,
}  = endpoints


export function signUp (
    name,
    userName,
    password,
    confirmPassword,
    navigate
)  {
    return async(dispatch) => {
        const toastId= toast.loading("Loading..")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SIGNUP_API, {
                name,
                userName,
                password,
                confirmPassword
            })

            console.log("SIGNUP API RESPONSE ....",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success(response?.data?.message ||"Signup Successful, Please Login")
            navigate("/login")
        }
        catch(error){
            console.log("SIGNUP API ERROR....",error)
            toast.error(error?.response?.data?.message ||"Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

// login
export function login(userName,password,navigate){
    return async(dispatch) => {
        const toastId= toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",LOGIN_API, {
                userName,password
            })

            console.log("LOGIN_API Response ....",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            dispatch(setUser(response?.data?.admin))
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.admin));
            navigate("/dashboard") 
        }
        catch(error){
            console.log("LOGIN API ERROR ......",error)
                toast.error(error?.response?.data?.message || "Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

// logout 
export function logout(navigate){
    return(dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out Successfully")
        navigate("/")

    }
}