import axios, { AxiosResponse } from "axios";
import { CallResponse, Call } from "@/models/types";

const handleCalls = async () => {
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
        `https://frontend-test-api.aircall.io/calls?offset=${offset}&limit=${limit}`,
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
