import { CallResponse, Call, Note } from "@/types/Models";
import {Button} from "antd";
import { handlearchive } from "@/api/archiveHandler";
import CallDetailsPopup from "@/components/callDetails";
import { ColumnsType } from "antd/es/table";


const column: any = [
  {
    dataIndex: 'call_type',
    title: 'Call Type',
    render: (_: any, record: Call) => {
      let callType: string = '';
      let color = '';

      if (record.call_type === 'voicemail') {
        callType = 'Voicemail';
        color = '#225FBD';
      } else if (record.call_type === 'answered') {
        callType = 'Answered';
        color = '#4AB8BA';
      } else if (record.call_type === 'missed') {
        callType = 'Missed';
        color = '#8A2A2A';
      }

      return <span style={{ color }}>{callType}</span>;
    },
  },
  {
    dataIndex: 'direction',
    title: 'Direction',
    render: (_: any, record: Call) => (
      <span style={{ color: '#225FBD' }}>
        {record.direction === 'inbound' ? 'Inbound' : 'Outbound'}
      </span>
    ),
  },
  { dataIndex: 'duration', title: 'Duration' },
  { dataIndex: 'from', title: 'From' },
  { dataIndex: 'to', title: 'To' },
  { dataIndex: 'via', title: 'Via' },
  { dataIndex: 'created_at', title: 'Created At' },
  {
    dataIndex: 'is_archived',
    title: 'Is Archived',
    render: (_: any, record: Call) => (
      <Button
        onClick={() => handlearchive(record)}
        type="link"
        style={{
          borderRadius: '4px',
          backgroundColor: '#E0FFF6',
          color: '#19C2C4',
          boxShadow: 'none',
        }}
        danger={record.is_archived}
      >
        {record.is_archived ? 'Archived' : 'Unarchived'}
      </Button>
    ),
  },
  {
    dataIndex: 'actions',
    title: 'Actions',
    render: (_: any, record: Call) => <CallDetailsPopup call={record} />,
  },
];


export default column;
