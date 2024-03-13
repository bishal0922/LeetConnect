
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { Button } from "@mui/material";

const Navbar = ({ user }) => {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("Signed out successfully");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <nav style={{ padding: "20px", display: "flex", justifyContent: "space-between" }}>
            <span>LeetConnect</span>
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
