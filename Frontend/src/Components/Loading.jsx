import React from 'react';
import './Loading.css';
import SharkLogo from '../assets/logo.png'; // Ensure the logo.png is in the same folder

export default function Loading() {
    return (
        <div className="loader">
            <div className="svg-wrapper">
                <img src={SharkLogo} alt="Loading Shark Logo" className="shark-logo" />
            </div>
        </div>
    );
}
