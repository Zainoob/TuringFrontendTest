import { Button, Modal, Form, Input, Typography, notification } from "antd";
import { useState } from "react";
import { DetailsContainer, Text, StyledButton } from "./elements";
import handleNote from "@/api/notesHandler";
import { CallDetailsPopupProps } from "../../models/types";

const CallDetailsPopup: React.FC<CallDetailsPopupProps> = ({ call }) => {
  // State variables
  const [visible, setVisible] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  // Open the modal
  const handleClickOpen = () => {
    setVisible(true);
  };

  // Close the modal
  const handleClose = () => {
    setVisible(false);
  };

  // Update the note value when input changes
  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  // Save the note
  const handleSaveNote = async (): Promise<void> => {
    const callId:string = call.id; // Accessing the call ID from the props
    handleClose();
    try {
      // Call the API to save the note
      const check: boolean | undefined = await handleNote(callId, note);
      if (check) {
        notification.success({
          message: "Note Added!",
          duration: 1, // Duration in seconds for pop up
        });
      }
    } catch (error) {
      alert(`Error fetching data:${error}`);
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



