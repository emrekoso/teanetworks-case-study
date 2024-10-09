import React from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

interface ScrollToTopButtonProps {
    show: boolean;
    onClick: () => void;
}

export default function ScrollToTopButton({ show, onClick }: ScrollToTopButtonProps) {
    return (
        <Zoom in={show}>
            <Fab
                size="medium"
                onClick={onClick}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    bgcolor: "#04c283",
                    color: "#83e0c2",
                    '&:hover': {
                        bgcolor: "#027750",
                    },
                }}
                aria-label="Scroll to top"
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Zoom>
    );
}