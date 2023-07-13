import axios, { AxiosResponse } from "axios";
import { authtoken } from "@/models/types";
const handlelogin = async (username: string, password: string) => {
  try {
    const response: AxiosResponse<authtoken> = await axios.post(
      "https://frontend-test-api.aircall.io/auth/login",
      {
        username,
        password,
      }
    );
    const authToken: authtoken = response.data;

    if (authToken.access_token) {
      //setting authtoken in local storage
      localStorage.setItem("access_token", authToken.access_token);
      //Starting token refresh timer (10 minutes) before it expires
      setTimeout(refreshToken, 1000 * 60 * 10);
      return true;
    } 
    // Display alert message
  } catch (error) {
    console.log("Login failed:", error);
  }
};
//sending refresh token request to endpoint auth/refresh-token
const refreshToken = async (): Promise<void> => {
  const Token: string | null = localStorage.getItem("access_token");
  if (!Token) {
    console.log("No token in storage");
    return;
  }

  try {
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

    // Starting token refresh timer (10 minutes) before it expires
    setTimeout(refreshToken, 1000 * 60 * 10);
  } catch (error) {
    console.log("Token refresh failed:", error);
  }
};

export default handlelogin;
