import axios, { AxiosResponse } from "axios";
import {Call, Note } from "@/models/types";
require('dotenv').config();  


const BASE_URL= process.env.BASE_URL;

const endpoints ={
  archive:'/archive',
  calls:'/calls/',
};

// Function to handle archiving/unarchiving a call
export const handlearchive = async (call: Call):Promise<Call> => {
  const callid: string = call.id;
  const token: string | null = localStorage.getItem("access_token");

  // Check if access token is available
  if (!token) {
    throw new Error("Access token not found");
  }

  try {
    // Send a PUT request to archive/unarchive the call
    const response: AxiosResponse<Call> = await axios.put(
      `${BASE_URL}${endpoints.calls}${callid}${endpoints.archive}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`${BASE_URL}${endpoints.calls}${callid}${endpoints.archive}`);

    // Update the is_archived value of the call
    if (response.data.id) {
      call.is_archived = response.data.is_archived;
      return response.data;
    }
    return call;

  } catch (error) {
    console.log("Archive try failed:", error);
    return call;
  }
};
