import axios, { AxiosResponse } from "axios";
import { authtoken } from "@/models/types";
import { Router } from "next/router";
require('dotenv').config();  


const BASE_URL= process.env.BASE_URL;
const TIME_OUT =parseInt(process.env.TIME_OUT || '0');

const endpoints ={
  login:'/auth/login',
  refreshtoken:'/auth/refresh-token'
};

// Function to handle user login
const handlelogin = async (username: string, password: string):Promise<true | undefined> => {
  try {
    // Send a POST request to the login endpoint
    const response: AxiosResponse<authtoken> = await axios.post(
      `${BASE_URL}${endpoints.login}`,
      {
        username,
        password,
      }
    );
    if (response.data.access_token) {
      // Store the access token in local storage
      localStorage.setItem("access_token", response.data.access_token);
      // Start token refresh timer (10 minutes) before it expires
      setTimeout(refreshToken, TIME_OUT);
      return true;
    }
    // Display alert message

  } catch (error) {
    alert(`Error fetching data:${error}`);
  }
};

// Function to send a refresh token request
const refreshToken = async (): Promise<void> => {
  const Token: string | null = localStorage.getItem("access_token");

  // Check if access token is available
  if (!Token) {
    throw new Error("Access token not found");
  }

  try {
    // Send a POST request to refresh the token
    const response: AxiosResponse<authtoken> = await axios.post(
      `${BASE_URL}${endpoints.refreshtoken}`,
      {
        refreshToken: Token,
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    localStorage.setItem("access_token", response.data.access_token);

    // Start token refresh timer (10 minutes) before it expires
    setTimeout(refreshToken, TIME_OUT);
  } catch (error) {
    alert(`Error fetching data:${error}`);
  }
};

export default handlelogin;
