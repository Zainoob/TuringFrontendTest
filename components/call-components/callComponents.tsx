import { Call } from "@/models/types";
import CallDetailsPopup from "@/components/call-details/callDetails";

// Function to render the call type column
export function renderCallType(record: Call):JSX.Element {
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
export function renderDirection(record: Call):JSX.Element {
  return (
    <span style={{ color: "#225FBD" }}>
      {record.direction === "inbound" ? "Inbound" : "Outbound"}
    </span>
  );
}

// Function to render the actions column
export function renderActions(record: Call):JSX.Element {
  return <CallDetailsPopup call={record} />;

}
