import axios, { AxiosResponse } from "axios";
import { CallResponse, Call } from "@/models/types";

require('dotenv').config();  


const BASE_URL= process.env.BASE_URL;

const endpoints ={
  calls:'/calls',
};


const handleCalls = async (offset:number, limit:number):Promise<CallResponse | undefined> => {
  try {
    const token: string | null = localStorage.getItem("access_token");

    // Check if access token is available
    if (!token) {
      throw new Error("Access token not found");
    }
    // Fetch calls with pagination
      const response: AxiosResponse<CallResponse> = await axios.get(
        `${BASE_URL}${endpoints.calls}?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Append fetched calls to the existing array
    return response.data;

  } catch (error) {
    alert(`Error fetching data:${error}`);
  }
};

export default handleCalls;
