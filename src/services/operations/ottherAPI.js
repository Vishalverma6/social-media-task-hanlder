import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { otherEndpoints } from "../apis"

const {
    SEND_USER_DATA_API,
    GET_ALL_USER_DATA_API,
    DELETE_USER_DATA_API
} =otherEndpoints;


// get all User data
export const getAllUserData = async() => {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET",GET_ALL_USER_DATA_API,);

        console.log("GET_ALL_USER_DATA API RESPONSE",response)
        if(!response.data.success){
            throw new Error (response?.data?.message || "Could not fetch all menu items ")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetch All user data ")
    }
    catch
    (error){
        console.log("GET_ALL_USER_DATA API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

// send the user Data 
export const sendUserData = async(data) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try{
        const response = await apiConnector("POST",SEND_USER_DATA_API, data);

        console.log("SEND_USER_DATA API RESPONSE",response)

        if(!response.data.success){
            throw new Error (response?.data?.message || "unable to Send the data ")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully Send the data")

    }
    catch(error){
        console.log("SEND_USER_DATA API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

// delete the user data
export const deletUserdata = async(dataId) => {
    console.log("dataId",dataId)
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector('DELETE',DELETE_USER_DATA_API,dataId);

        console.log("DELETE_USER_DATA_API RESPONSE ...",response);

        if(!response.data.success){
            throw new Error (response?.data?.message || "unable to Send the data ")
        }

        toast.success(response?.data?.message || "User Data Deleted Successfully")
    }
    catch(error){
        console.log("DELETE_USER_DATA_API ERROR...",error);
        toast.error(error?.message);
    }
    toast.dismiss(toastId);
}