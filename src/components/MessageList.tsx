import React from 'react';
import { Message } from '../types';
import { List } from '@mui/material';
import MessageItem from './MessageItem';


interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    return (
        <List>
            {messages.map((message) => (
                <>
                <MessageItem key={message.id} message={message} />
                </>
            ))}
        </List>
    );
}