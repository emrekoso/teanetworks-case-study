import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useStore } from './ChatScreen';

const backgroundOptions = [
    { label: 'Default', value: '' },
    { label: 'Aurora', value: '../../public/aurora.webp' },
    { label: 'Nature', value: '../../public/nature.jpg' },
    { label: 'Abstract', value: '../../public/abstract.jpg' },
];

export default function BackgroundSelector() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { setBackgroundImage } = useStore();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectBackground = (imagePath: string) => {
        setBackgroundImage(imagePath);
        handleClose();
    };

    return (
        <>
            <Button
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    color: "#003E29",
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                }}
            >
                Background Image
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    marginTop: "5px",
                }}
            >
                {backgroundOptions.map((option) => (
                    <MenuItem key={option.value} onClick={() => handleSelectBackground(option.value)}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}