import { Button, Modal, Form, Input, Typography } from "antd";
import { useState } from "react";
import axios from "axios";
import handleNote from "@/api/notesHandler";
import { Call } from "../types/Models";

interface CallDetailsPopupProps {
  call: Call;
}

const CallDetailsPopup: React.FC<CallDetailsPopupProps> = ({ call }) => {
  const [visible, setVisible] = useState(false);
  const [note, setNote] = useState("");

  const handleClickOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleSaveNote = async (): Promise<void> => {
    console.log("Note:", note);
    const callId = call.id; // Accessing the call ID from the props
    handleClose();
    try{
      const check:boolean|undefined=await handleNote(callId,note);
      if(check)
      {
        console.log("Note added successfully");
      }
    }
    catch(error){
      console.log("Saving notes failed.", error);
    }
    
  };

  return (
    <div>
      <Button onClick={handleClickOpen} size="small" type="primary" style={{ backgroundColor: "#4C41F5" }}>
        Add Note
      </Button>
      <Modal title={
      <Typography.Title level={4}>Call Details</Typography.Title>}
       visible={visible} onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveNote} style={{ backgroundColor: "#4C41F5" }}>
            Save Note
          </Button>,
        ]}
      >
        <p>
          <Typography.Text strong>Call ID: </Typography.Text>
          <Typography.Text>{call.id}</Typography.Text>
        </p>
        <p>
          <Typography.Text strong>Caller: </Typography.Text>
          <Typography.Text>{call.from}</Typography.Text>
        </p>
        <Form>
          <Form.Item label="Add Note">
          <Input value={note} onChange={handleNoteChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CallDetailsPopup;



