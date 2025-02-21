import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const isTokenExpired = (token) => {
  if (!token) return true; // If no token, consider it expired

  try {
    const decoded = jwtDecode(token);
    console.log("decoed",decoded)
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime; // Check if expired
  } catch (error) {
    console.log("no token")
    return true; // If decoding fails, treat it as expired
  }
};
