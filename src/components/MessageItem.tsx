import React from 'react';
import { authStore } from "../store/auth.js";
import { Message } from '../types';
import { useStore } from './ChatScreen';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ListItem, ListItemText, IconButton, Typography, Box, Button } from '@mui/material';
// @ts-ignore
import moment from "moment/moment";

interface MessageItemProps {
    message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
    const { setEditingMessage, setIsEditDialogOpen, deleteMessage } = useStore();
    const { user } = authStore();

    const handleEdit = () => {
        setEditingMessage(message);
        setIsEditDialogOpen(true);
    };

    return (
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={
                <div className="flex">
                    {user.name}
                    <div className="pl-3 text-xs text-gray-500 italic">
                        {moment(message.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                    </div>
                </div>
                }
                secondary={
                    <div>
                        <div className="max-w-max w-1/2 pl-5">
                            <div className="bg-[#003E29] p-3 rounded">
                                <Typography component="span" variant="body2"  /*color="text.primary"*/ sx={{display: "inline", color: "white", wordWrap: "break-word"}}>
                                    {message.text}
                                </Typography>
                            </div>
                        </div>
                        {message.attachment && (
                            <Box mt={1} className="pl-5">
                                {message.attachment.type === 'file' ? (
                                    <Button sx={{color: "#003E29"}} href={message.attachment.url} download>
                                        Download File: {message.attachment.name}
                                    </Button>
                                ) : (
                                    <img src={message.attachment.url}
                                         alt="Uploaded or fetched"
                                         style={{maxWidth: '200px'}}/>
                                )}
                            </Box>
                        )}
                    </div>
                    }
                    />
                    <IconButton sx={{color: "#003E29"}} edge="end" aria-label="edit" onClick={handleEdit}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton sx={{color: "#D3494E"}}
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteMessage(message.id)}>
                        <DeleteIcon/>
                    </IconButton>
                    </ListItem>
                    );
                }