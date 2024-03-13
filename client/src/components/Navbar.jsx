
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = ({ user }) => {
    const navigate = useNavigate(); // Hook for navigation
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Signed out successfully");
        } catch (error) {
            console.error("Sign out error:", error);
        }

        // Alternatively, use the navigate hook to redirect to home page
        navigate('/');
    };

    return (
        <nav style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
            <Typography 
                variant="h6" 
                onClick={() => navigate('/')} 
                style={{ 
                    cursor: "pointer", 
                    fontWeight: 700, // Make the font weight bolder
                    fontSize: "1.5rem", // Increase font size
                    color: "gray", // A Material-UI blue for a pop of color
                    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", // Specify the font family, adjust as needed
                }}
            >
                LeetConnect
            </Typography>
            <div>
                {user ? (
                    <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
                ) : (
                    <>
                        <Button variant="contained" href="/signup" style={{ marginRight: "10px" }}>Sign Up</Button>
                        <Button variant="contained" href="/signin">Sign In</Button>
                    </>
                )}
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.instanceOf(null)
    ])
};

export default Navbar;
