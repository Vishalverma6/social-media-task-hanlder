const BASE_URL = process.env.REACT_APP_BASE_URL


// auth Enpoints 
export const endpoints = {
    SIGNUP_API:BASE_URL + "/auth/signup",
    LOGIN_API :BASE_URL + "/auth/login",
}

// other Endpoints
export const otherEndpoints = {
    SEND_USER_DATA:BASE_URL +"/userData/submitData",
    GET_ALL_USER_DATA:BASE_URL + "/userData/getAllUserData",
}