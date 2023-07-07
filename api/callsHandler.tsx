import axios, { AxiosResponse } from "axios";
import { CallResponse, Call} from "@/types/Models";
const handleCalls = async () => {

    try {
      const token: string | null = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token not found");
      }
      console.log("Access token working", token);

      const calls: Call[] = [];
      var nextpage: boolean = true;

      let offset = 0;
      const limit = 10;

      while (true) {
        const response: AxiosResponse<CallResponse> = await axios.get(
          "https://frontend-test-api.aircall.io/calls",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              offset,
              limit,
            },
          }
        );

        const callResponse: CallResponse = response.data;
        const { nodes, hasNextPage } = callResponse;

        calls.push(...nodes);
        nextpage = callResponse.hasNextPage;

        if (!nextpage) {
          break;
        }

        offset += limit;
      }

      console.log(JSON.stringify(calls));
      return calls;

    } catch (error) {
      console.log("Error in fetching calls", error);
    }
  };

  export default handleCalls;