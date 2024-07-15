import { MarkEmailRead } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import service from "../../api/service";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
const PrivateMessagesDialog = ({ isOpen, onDialogClose }) => {
  const employee_id = useSelector((state) => state.tab.employee_id);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await service.getMessagesByEmployee(employee_id);
        if (response.status === true) {
          setMessages(response.data);
        } else toast.warn(response.message);
      } catch (err) {
        toast.warn(err.message);
      }
    };
    getMessages();
  }, [employee_id]);
  return (
    <Dialog open={isOpen} onClose={onDialogClose} fullWidth>
      <DialogTitle>New Messages</DialogTitle>
      <DialogContent>
        <div className="flex flex-col h-1/2 sm:h-full border bg-slate-200 rounded-lg text-left p-2 gap-2 mt-4 mb-2 overflow-y-auto">
          {messages.map((message, index) => (
            <Alert key={index} severity={message.type === "Normal" ? "success" : "warning"}>
              <AlertTitle>
                <span className="font-bold text-xl">{message.subject}</span> -{" "}
                <span className="font-bold text-xs"> {moment.utc(message.created_at).local().format("YYYY-MM-DD HH:mm")}</span>
              </AlertTitle>
              <div className="flex gap-2">
                <span>{message.message}</span>
                <MarkEmailRead
                  color="primary"
                  fontSize="large"
                  className="hover:text-blue-500 cursor-pointer"
                  onClick={async () => {
                    try {
                      const response = await service.markAsRead(message._id, employee_id);
                      if (response.status === true) {
                        const unreadMessages = messages.filter((item) => item._id !== message._id);
                        setMessages(unreadMessages);
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                ></MarkEmailRead>
              </div>
            </Alert>
          ))}
          {messages.length === 0 && <Alert severity="info">No new messages</Alert>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onDialogClose();
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivateMessagesDialog;
