export interface Message {
    id: number;
    text: string;
    sender: string;
    attachment?: {
        type: 'file' | 'image';
        name: string;
        url: string;
    };
    timestamp: Date;
}

export interface ChatState {
    messages: Message[];
    inputMessage: string;
    editingMessage: Message | null;
    isEditDialogOpen: boolean;
    showScrollToTop: boolean;
    suggestion: string;
    isSnackbarOpen: boolean;
    snackbarMessage: string;
    isSelectionOpen: boolean;
    backgroundImage: string;

    setMessages: (messages: Message[]) => void;
    setInputMessage: (inputMessage: string) => void;
    setEditingMessage: (editingMessage: Message | null) => void;
    setIsEditDialogOpen: (isOpen: boolean) => void;
    setShowScrollToTop: (show: boolean) => void;
    setSuggestion: (suggestion: string) => void;
    setIsSnackbarOpen: (isOpen: boolean) => void;
    setSnackbarMessage: (message: string) => void;
    setIsSelectionOpen: (isOpen: boolean) => void;
    addMessage: (message: Message) => void;
    updateMessage: (updatedMessage: Message) => void;
    deleteMessage: (id: number) => void;
    setBackgroundImage: (imagePath: string) => void;
}