import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BACKEND_URL;

export const register = async (userName: string, email: string,mobile: string, password: string) => {
    return axios.post(`${BASE_URL}/auth/signup`, { userName, email, mobile, password });
};

export const login = async (email: string, password: string) => {
    return axios.post(`${BASE_URL}/auth/signin`, { email, password });
};

export const sendotp = async (email: string) => {
    return axios.post(`${BASE_URL}/auth/requestOtp?email=${email}`,);
};

export const verifyotp = async (email: string, otp: string) => {
    return axios.post(`${BASE_URL}/auth/verifyOtp?otp=${otp}&email=${email}`);
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
    return axios.post(`${BASE_URL}/auth/changePassword`, { email, otp, newPassword });
};

