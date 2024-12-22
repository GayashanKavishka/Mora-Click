import { jwtDecode } from "jwt-decode";


function isCanteenAuthenticated() {
    const token = localStorage.getItem('token'); // Retrieve token
    if (!token) return false;

    try {
        const decoded = jwtDecode(token); // Decode the token
        if (!decoded.exp) return false;

        if(decoded.role !== "canteen") return false; // Check if the role is canteen

        // Check if the token has expired
        const isExpired = decoded.exp * 1000 < Date.now(); // `exp` is in seconds, multiply by 1000
        return !isExpired;
    } catch (err) {
        console.error("Failed to decode or validate token:", err);
        return false;
    }
}

export default isCanteenAuthenticated;

