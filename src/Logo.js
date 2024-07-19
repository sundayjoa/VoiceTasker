import React, {useState} from "react";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import "./App.css";

import {Box} from "@mui/material";


const Logo = () => {
    const [LogoTitle, setLogoTitle] =useState(false);

    //로고 타이틀 이벤트
    const handleMouseEnter = () => {
        setLogoTitle(true);
    };

    const handleMouseLeave = () => {
        setLogoTitle(false)
    };


    return(
        <div
            className = "logo-container"
            onMouseEnter = {handleMouseEnter}
            onMouseLeave = {handleMouseLeave}
        >
        <Box sx={{marginTop: 30}}>
            <AcUnitIcon className={`spin ${LogoTitle ? 'logo' : ''}`} />
            {LogoTitle && <span className="logo-title"> Do it! </span>}
        </Box>
        </div>
    );
};

export default Logo;