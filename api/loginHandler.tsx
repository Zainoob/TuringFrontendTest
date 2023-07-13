import axios, { AxiosResponse } from "axios";
import { authtoken } from "@/models/types";

// Function to handle user login
const handlelogin = async (username: string, password: string) => {
  try {
    // Send a POST request to the login endpoint
    const response: AxiosResponse<authtoken> = await axios.post(
      "https://frontend-test-api.aircall.io/auth/login",
      {
        username,
        password,
      }
    );

    const authToken: authtoken = response.data;

    if (authToken.access_token) {
      // Store the access token in local storage
      localStorage.setItem("access_token", authToken.access_token);
      // Start token refresh timer (10 minutes) before it expires
      setTimeout(refreshToken, 1000 * 60 * 10);
      return true;
    }
    // Display alert message

  } catch (error) {
    console.log("Login failed:", error);
  }
};

// Function to send a refresh token request
const refreshToken = async (): Promise<void> => {
  const Token: string | null = localStorage.getItem("access_token");

  // Check if access token is available
  if (!Token) {
    console.log("No token in storage");
    return;
  }

  try {
    // Send a POST request to refresh the token
    const response: AxiosResponse<authtoken> = await axios.post(
      "https://frontend-test-api.aircall.io/auth/refresh-token",
      {
        refreshToken: Token,
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    const authToken: authtoken = response.data;
    localStorage.setItem("access_token", authToken.access_token);

    // Start token refresh timer (10 minutes) before it expires
    setTimeout(refreshToken, 1000 * 60 * 10);
  } catch (error) {
    console.log("Token refresh failed:", error);
  }
};

export default handlelogin;
