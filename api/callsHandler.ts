import axios, { AxiosResponse } from "axios";
import { CallResponse, Call } from "@/models/types";

require('dotenv').config();  


const BASE_URL= process.env.BASE_URL;

const endpoints ={
  calls:'/calls',
};


const handleCalls = async ():Promise<Call[] | undefined> => {
  try {
    const token: string | null = localStorage.getItem("access_token");

    // Check if access token is available
    if (!token) {
      throw new Error("Access token not found");
    }

    const calls: Call[] = [];
    let offset = 0;
    const limit = 10;

    // Fetch calls with pagination
    while (true) {
      const response: AxiosResponse<CallResponse> = await axios.get(
        `${BASE_URL}${endpoints.calls}?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const callResponse: CallResponse = response.data;
      const { nodes, hasNextPage } = callResponse;

      // Append fetched calls to the existing array
      calls.push(...nodes);

      // If there are no more pages, break the loop
      if (!hasNextPage) {
        break;
      }

      // Increment offset for the next page
      offset += limit;
    }

    return calls;

  } catch (error) {
    console.log("Error in fetching calls", error);
  }
};

export default handleCalls;
