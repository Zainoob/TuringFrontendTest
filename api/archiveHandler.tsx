import axios, { AxiosResponse } from "axios";
import { CallResponse, Call, Note } from "@/models/types";

// Function to handle archiving/unarchiving a call
export const handlearchive = async (call: Call) => {
  const callid: string = call.id;
  const token: string | null = localStorage.getItem("access_token");

  // Check if access token is available
  if (!token) {
    throw new Error("Access token not found");
  }

  try {
    // Send a PUT request to archive/unarchive the call
    const response: AxiosResponse<any> = await axios.put(
      `https://frontend-test-api.aircall.io/calls/${callid}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update the is_archived value of the call
    if (response.data) {
      call.is_archived = response.data.is_archived;
      return response.data;
    }
    return call;

  } catch (error) {
    console.log("Archive try failed:", error);
    return call;
  }
};
