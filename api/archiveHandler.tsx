import axios, { AxiosResponse } from "axios";
import { CallResponse, Call, Note } from "@/models/types";
export const handlearchive = async (call: Call) => {
  const callid: string = call.id;
  const token: string | null = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Access token not found");
  }

  try {
    const response: AxiosResponse<any> = await axios.put(
      `https://frontend-test-api.aircall.io/calls/${callid}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Return the updated is_archived value from the response
    if (response.data) {
      call.is_archived=response.data.is_archived;
      return response.data;
    }
    return call;

    // Display alert message
  } catch (error) {
    console.log("Archive try failed:", error);
    return call;
  }
};
