import React, { useState } from 'react';
import SantaImage from './images/santa-claus.png';
import './App.css'

const Santa = () => {
    return (
        <div>
            <img src = {SantaImage} alt = "Santa Claus" className = "santaImage" />
        </div>
    );
};

export default Santa;