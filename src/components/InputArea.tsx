import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, IconButton, Typography, Paper } from '@mui/material';
import { Send as SendIcon, AttachFile as AttachFileIcon, Image as ImageIcon } from '@mui/icons-material';
import { useStore } from './ChatScreen';
import { Message } from '../types';

const suggestions = [
    "Hello", "What's up?", "How are you?", "Hey!", "Let's go!",
    "Looks good!", "Awesome", "TEA networks", "Alright", "OK"
];

export default function InputArea() {
    const {
        inputMessage,
        suggestion,
        setInputMessage,
        setSuggestion,
        addMessage,
        setIsSelectionOpen
    } = useStore();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);


    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            if (inputMessage === '/select') {
                setIsSelectionOpen(true);
                setInputMessage('');
                return;
            }

            const randomCommandRegex = /^\/random (\d+)$/;
            const match = inputMessage.match(randomCommandRegex);

            if (match) {
                const id = match[1];
                try {
                    const response = await axios.get(`https://picsum.photos/id/${id}/info`);
                    const imageUrl = response.data.download_url;
                    const newMessage: Message = {
                        id: Date.now(),
                        text: `Random image (ID: ${id})`,
                        sender: 'User',
                        attachment: {
                            type: 'image',
                            name: 'Random Image',
                            url: imageUrl,
                        },
                        timestamp: new Date(),
                    };
                    addMessage(newMessage);
                } catch (error) {
                    console.error('Error fetching random image:', error);
                    const errorMessage: Message = {
                        id: Date.now(),
                        text: `Error fetching random image with ID: ${id}`,
                        sender: 'System',
                        timestamp: new Date(),
                    };
                    addMessage(errorMessage);
                }
            } else {
                const newMessage: Message = {
                    id: Date.now(),
                    text: inputMessage,
                    sender: 'User',
                    timestamp: new Date(),
                };
                addMessage(newMessage);
            }
            setInputMessage('');
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newMessage: Message = {
                    id: Date.now(),
                    text: type === 'file' ? `File uploaded: ${file.name}` : 'Image uploaded',
                    sender: 'User',
                    attachment: {
                        type,
                        name: file.name,
                        url: e.target?.result as string,
                    },
                    timestamp: new Date()
                };
                addMessage(newMessage);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && suggestion) {
            e.preventDefault();
            setInputMessage(suggestion);
            if (inputRef.current) {
                inputRef.current.setSelectionRange(inputMessage.length, suggestion.length);
            }
        } else if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        const matchingSuggestion = suggestions.find(s =>
            s.toLowerCase().startsWith(inputMessage.toLowerCase()) && s.length > inputMessage.length
        );
        setSuggestion(matchingSuggestion || '');
    }, [inputMessage, setSuggestion]);

    return (
        <Paper elevation={3} sx={{ p: 2, bgcolor: "grey.100" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message or /random {id} or /select"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    inputRef={inputRef}
                    InputProps={{
                        endAdornment: (
                            <Typography
                                variant="body1"
                                sx={{
                                    position: 'absolute',
                                    right: 70,
                                    color: 'text.disabled',
                                    pointerEvents: 'none'
                                }}
                            >
                                {suggestion && (
                                    <>
                                        {inputMessage}<strong>{suggestion.slice(inputMessage.length)}</strong>
                                    </>
                                )}
                            </Typography>
                        ),
                    }}
                />
                <IconButton onClick={() => fileInputRef.current?.click()}>
                    <AttachFileIcon />
                </IconButton>
                <IconButton onClick={() => imageInputRef.current?.click()}>
                    <ImageIcon />
                </IconButton>
                <Button sx={{bgcolor: "#003E29"}} variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, 'file')}
            />
            <input
                type="file"
                accept="image/*"
                ref={imageInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, 'image')}
            />
        </Paper>
    );
}