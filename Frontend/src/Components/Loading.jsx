import React from 'react';
import './Loading.css';
import SharkLogo from '../assets/logo.png';

export default function Loading() {
    return (
        <div className="loader">
            <div className="animation-wrapper">
                <img src={SharkLogo} alt="Loading Shark Logo" className="shark-logo" />
            </div>
        </div>
    );
}
