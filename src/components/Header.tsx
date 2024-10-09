import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import {authStore} from "../store/auth.js";

const Header = () => {
    const { logout } = authStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="flex p-4 justify-between bg-white">
            <div className="flex gap-2 text-2xl text-[#003E29] font-bold">
                <EmojiFoodBeverageIcon fontSize="large" className="text-[#003E29]"/>
                TEAChat
            </div>
            <div className="text-[#D3494E] hover:cursor-pointer" onClick={handleLogout}>
                <ExitToAppIcon fontSize="large"/>
            </div>
        </nav>
    );
};

export default Header;