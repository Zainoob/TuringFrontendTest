import { Button, Modal, Form, Input, Typography, notification } from "antd";
import { useState } from "react";
import { DetailsContainer,Text } from "@/styles/callDetails.styled";
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
        notification.success({
          message: "Note Added!",
          duration: 1, // Duration in seconds for pop up
        });
        console.log("Note added successfully");
      }
    }
    catch(error){
      console.log("Saving notes failed.", error);
    }
    
  };

  return (
    <DetailsContainer>
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
        <Text>
          <Typography.Text strong>Call ID: </Typography.Text>
          <Typography.Text>{call.id}</Typography.Text>
        </Text>
        <Text>
          <Typography.Text strong>Caller: </Typography.Text>
          <Typography.Text>{call.from}</Typography.Text>
        </Text>
        <Form>
          <Form.Item label="Add Note">
          <Input value={note} onChange={handleNoteChange} />
          </Form.Item>
        </Form>
      </Modal>
    </DetailsContainer>
  );
};

export default CallDetailsPopup;



