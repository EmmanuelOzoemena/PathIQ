// src/services/auth.js
import axios from "axios";

export const register = async (name, email, password) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/student/signup`,
      {
        name,
        email,
        password,
      },
    );
    return res;
  } catch (error) {
    console.error("ERROR", error);
    return error?.response;
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/student/login`,
      {
        email,
        password,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/student/verify-account`,
      {
        email,
        otp,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const resendOtp = async (email) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/student/resend-otp`,
      {
        email,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const forgetPassword = async (email) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/student/forgot-password`,
      {
        email,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/student/reset-password`,
      {
        email,
        otp,
        newPassword
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};



export const registerParent = async (name, email, password, uniqueCode) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/guardian/signup`,
      {
        name,
        email,
        password,
        uniqueCode, // 444625057333
      },
    );
    return res;
  } catch (error) {
    console.error("ERROR", error);
    return error?.response;
  }
};

export const verifyOtpParent = async (email, otp) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/guardian/verify-account`,
      {
        email,
        otp,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const resendOtpParent = async (email) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/guardian/resend-otp`,
      {
        email,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const loginParent = async (email, password) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/guardian/login`,
      {
        email,
        password,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};


export const loginAdmin = async (email, password) => {
  try {
    const res = await axios.post(
      `https://api-pathiq.onrender.com/api/v1/auth/admin/login`,
      {
        email,
        password,
      },
    );
    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

// OAuth 
export const socialAuth = {
  google: "https://api-pathiq.onrender.com/api/v1/oauth/google"
  // twitter: `${API_BASE_URL}/oauth/twitter`,
};