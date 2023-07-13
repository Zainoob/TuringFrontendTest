import { Button, Modal, Form, Input, Typography, notification } from "antd";
import { useState } from "react";
import { DetailsContainer,Text, StyledButton } from "@/styles/callDetails.styled";
import handleNote from "@/api/notesHandler";
import { Call } from "../models/types";
import { CallDetailsPopupProps } from "../models/types";


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
      }
    }
    catch(error){
      console.log("Saving notes failed.", error);
    }
    
  };

  return (
    <DetailsContainer>
      <StyledButton  onClick={handleClickOpen} size="small" type="primary" >
        Add Note
      </StyledButton >
      <Modal title={
      <Typography.Title level={4}>Call Details</Typography.Title>}
       visible={visible} onCancel={handleClose}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <StyledButton  key="save" type="primary" onClick={handleSaveNote} >
            Save Note
          </StyledButton >,
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



