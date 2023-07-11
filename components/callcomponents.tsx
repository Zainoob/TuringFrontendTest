import { Call } from "@/types/Models";
import { Button } from "antd";
import { handlearchive } from "@/api/archiveHandler";
import CallDetailsPopup from "@/components/callDetails";

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

export function renderDirection(_: any, record: Call) {
  return (
    <span style={{ color: "#225FBD" }}>
      {record.direction === "inbound" ? "Inbound" : "Outbound"}
    </span>
  );
}

export function renderActions(_: any, record: Call) {
  return <CallDetailsPopup call={record} />;
}


