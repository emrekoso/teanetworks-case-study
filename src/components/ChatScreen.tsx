import { create } from 'zustand';
import InputArea from './InputArea';
import { ChatState } from '../types';
import MessageList from './MessageList';
import { styled } from '@mui/material/styles';
import SelectionModal from "./SelectionModal";
import React, { useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ScrollToTopButton from './ScrollToTopButton';
import EditMessageDialog from './EditMessageDialog';
import { Box, Paper, Snackbar } from '@mui/material';
import BackgroundSelector from "./BackgroundSelector";

const StyledPaper = styled(Paper)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#000000',
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#011f17',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(84,83,83,0.92)',
    },
}));


export const useStore = create<ChatState>((set) => ({
    messages: [],
    inputMessage: '',
    editingMessage: null,
    isEditDialogOpen: false,
    showScrollToTop: false,
    suggestion: '',
    isSnackbarOpen: false,
    snackbarMessage: '',
    isSelectionOpen: false,
    backgroundImage: "",

    setMessages: (messages) => set({ messages }),
    setInputMessage: (inputMessage) => set({ inputMessage }),
    setEditingMessage: (editingMessage) => set({ editingMessage }),
    setIsEditDialogOpen: (isEditDialogOpen) => set({ isEditDialogOpen }),
    setShowScrollToTop: (showScrollToTop) => set({ showScrollToTop }),
    setSuggestion: (suggestion) => set({ suggestion }),
    setIsSnackbarOpen: (isOpen) => set({ isSnackbarOpen: isOpen }),
    setSnackbarMessage: (message) => set({ snackbarMessage: message }),
    setIsSelectionOpen: (isOpen) => set({ isSelectionOpen: isOpen }),
    setBackgroundImage: (imagePath) => set({ backgroundImage: imagePath }),

    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    updateMessage: (updatedMessage) =>
        set((state) => ({
            messages: state.messages.map((m) =>
                m.id === updatedMessage.id ? updatedMessage : m
            ),
        })),
    deleteMessage: (id) =>
        set((state) => ({
            messages: state.messages.filter((m) => m.id !== id),
            isSnackbarOpen: true,
            snackbarMessage: 'Message deleted successfully',
        })),
    })
);

export default function ChatScreen() {
    const {
        messages,
        isEditDialogOpen,
        showScrollToTop,
        isSnackbarOpen,
        snackbarMessage,
        setShowScrollToTop,
        setIsSnackbarOpen,
        isSelectionOpen,
        setIsSelectionOpen,
        backgroundImage,
        addMessage,
    } = useStore();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            const handleScroll = () => {
                setShowScrollToTop(chatContainer.scrollTop > 300);
            };
            chatContainer.addEventListener('scroll', handleScroll);
            return () => chatContainer.removeEventListener('scroll', handleScroll);
        }
    }, [setShowScrollToTop]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const scrollToTop = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleWordSelection = (word: string) => {
        addMessage({
            id: Date.now(),
            text: word,
            sender: 'User',
            timestamp: new Date,
        });
        setIsSelectionOpen(false);
    };

    const wordSuggestions = [
        "Hello", "What's up?", "How are you?", "Hey!", "Let's go!",
        "Looks good!", "Awesome", "TEA networks", "Alright", "OK"
    ];

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#003E29', position: 'relative', padding: "5rem"}}>
            <StyledPaper elevation={3} ref={chatContainerRef} sx={{
                backgroundImage: `url(${backgroundImage})`,
            }}>
                <MessageList messages={messages} />
            </StyledPaper>
            <InputArea />
            <ScrollToTopButton show={showScrollToTop} onClick={scrollToTop} />
            <EditMessageDialog open={isEditDialogOpen} />
            <BackgroundSelector />
            <SelectionModal
                open={isSelectionOpen}
                onClose={() => setIsSelectionOpen(false)}
                onSelect={handleWordSelection}
                words={wordSuggestions}
            />
            <Snackbar
                open={isSnackbarOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={() => setIsSnackbarOpen(false)}
                message={snackbarMessage}
                action={
                    <React.Fragment>
                        <CloseIcon fontSize="small" onClick={() => setIsSnackbarOpen(false)} />
                    </React.Fragment>
                }
            />
        </Box>
    );
}