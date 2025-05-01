import React from 'react';
import './Loading.css';
import SharkLogo from '../assets/logo.webp'; // Adjust the path to your logo image

export default function Loading() {
    return (
        <div className="loader">
            <div className="animation-wrapper">
                <img src={SharkLogo} alt="Loading Shark Logo" className="shark-logo" />
            </div>
        </div>
    );
}
