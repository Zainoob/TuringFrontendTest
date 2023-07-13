import { Note } from "@/models/types";
import axios, { AxiosResponse } from "axios";

const handleNote = async (callId: string, note: string) => {
  const token: string | null = localStorage.getItem("access_token");

  // Check if access token is available
  if (!token) {
    return;
  }

  try {
    // Send a POST request to add a note to the call
    const response: AxiosResponse<any> = await axios.post(
      `https://frontend-test-api.aircall.io/calls/${callId}/note`,
      {
        content: note,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return true if the note was added successfully
    if (response.data) {
      return true;
    }

  } catch (error) {
    console.log("Error. Call details couldn't be added", error);
    return false;
  }
};

export default handleNote;
