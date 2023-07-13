import { Call } from "@/models/types";
import CallDetailsPopup from "@/components/callDetails";

// Function to render the call type column
export function renderCallType(_: any, record: Call) {
  let callType: string = "";
  let color = "";

  if (record.call_type === "voicemail") {
    callType = "Voicemail";
    color = "#225FBD";
  } else if (record.call_type === "answered") {
    callType = "Answered";
    color = "#4AB8BA";
  } else if (record.call_type === "missed") {
    callType = "Missed";
    color = "#8A2A2A";
  }

  return <span style={{ color }}>{callType}</span>;
}

// Function to render the direction column
export function renderDirection(_: any, record: Call) {
  return (
    <span style={{ color: "#225FBD" }}>
      {record.direction === "inbound" ? "Inbound" : "Outbound"}
    </span>
  );
}

// Function to render the actions column
export function renderActions(_: any, record: Call) {
  return <CallDetailsPopup call={record} />;
}
