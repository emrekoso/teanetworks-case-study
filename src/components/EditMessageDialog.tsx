import React from 'react';
import { useStore } from './ChatScreen';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface EditMessageDialogProps {
    open: boolean;
}

export default function EditMessageDialog({ open }: EditMessageDialogProps) {
    const { editingMessage, setEditingMessage, setIsEditDialogOpen, updateMessage } = useStore();

    const handleSaveEdit = () => {
        if (editingMessage) {
            updateMessage(editingMessage);
            setIsEditDialogOpen(false);
            setEditingMessage(null);
        }
    };

    return (
        <Dialog open={open} onClose={() => setIsEditDialogOpen(false)}>
            <DialogTitle>Edit Message</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    value={editingMessage?.text || ''}
                    onChange={(e) => {
                        if (editingMessage) {
                            setEditingMessage({ ...editingMessage, text: e.target.value });
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button sx={{color: "#003E29"}} onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button sx={{bgcolor:"#003E29"}} onClick={handleSaveEdit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}