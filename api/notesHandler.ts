import { Note, Call } from "@/models/types";
import axios, { AxiosResponse } from "axios";

require('dotenv').config();  


const BASE_URL= process.env.BASE_URL;

const endpoints ={
  note:'/note',
  calls:'/calls/',
};

const handleNote = async (callId: string, note: string):Promise<boolean | undefined> => {
  const token: string | null = localStorage.getItem("access_token");

  // Check if access token is available
  if (!token) {
    return;
  }

  try {
    // Send a POST request to add a note to the call
    const response: AxiosResponse<Call> = await axios.post(
      `${BASE_URL}${endpoints.calls}${callId}${endpoints.note}`,
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
    alert(`Error fetching data:${error}`);
    return false;
  }
};

export default handleNote;
