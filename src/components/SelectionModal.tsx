import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box } from '@mui/material';

interface WordSelectionModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (word: string) => void;
    words: string[];
}

export default function WordSelectionModal({ open, onClose, onSelect, words }: WordSelectionModalProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        const word = event.target.value;
        onSelect(word);
        onClose();
    };

    if (!open) return null;

    return (
        <Box /*sx={{ position: 'absolute', bottom: '100%', left: 0, right: 0, mb: 2 }}*/>
            <FormControl fullWidth>
                <InputLabel id="word-selection-label">Select a word</InputLabel>
                <Select
                    labelId="word-selection-label"
                    id="word-selection"
                    value=""
                    label="Select a word"
                    onChange={handleChange}
                    open={open}
                    onClose={onClose}
                    variant="outlined"
                >
                    {words.map((word, index) => (
                        <MenuItem key={index} value={word}>
                            {word}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
