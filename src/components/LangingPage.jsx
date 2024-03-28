import { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Typography, Button } from "@mui/material";
import HomePage from './HomePage'; // Import your HomePage component

const LandingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // If user is logged in, show HomePage
  if (user) {
    return <HomePage />;
  }

  // If user is not logged in, show the landing page content
  return (
    <Container component="main" maxWidth="md" style={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to LeetConnect
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Connect with fellow LeetCode enthusiasts.
      </Typography>
      <Button variant="contained" href="/signup" style={{ margin: "20px" }}>Get Started</Button>
    </Container>
  );
};

export default LandingPage;
