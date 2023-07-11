import { Note } from "@/types/Models";
import axios, { AxiosResponse } from "axios";

const handleNote = async (callId: string, note: string) => {
  const token: string | null = localStorage.getItem("access_token");
  if (!token) {
    console.log("No token in storage");
    return;
  }

  try {
    const response = await axios.post(
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
    if (response.data) {
      console.log("Saving the note", response.data);
      return true;
    } else {
      throw new Error("Call details couldn't be saved.");
    }
  } catch (error) {
    console.log("Error. Call details couldn't be added", error);
    return false;
  }
};

export default handleNote;
