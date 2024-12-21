import React from 'react';
import { Navigate } from 'react-router-dom';
import isCanteenAuthenticated from './authCanteen.jsx'; // Function from Step 1

const ProtectedCanteenRoute = ({ children }) => {
    return isCanteenAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedCanteenRoute;
