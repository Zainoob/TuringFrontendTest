import axios, { AxiosResponse } from "axios";
import { CallResponse, Call, Note } from "@/types/Models";
export const handlearchive = async (call: Call) => {
    const callid: string = call.id;
    const token: string | null = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("Access token not found");
    }
    console.log(callid);
    console.log(token);
  
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
      console.log("Archiving Call", JSON.stringify(response));
  
      // Display alert message
    } catch (error) {
      console.log("Archive try failed:", error);
    }
  };
  