import { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [leetCodeUsername, setLeetCodeUsername] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const linkLeetCodeAccount = () => {
    // Placeholder for your account linking logic
    console.log(leetCodeUsername);
    // Here, add the actual logic to link to LeetCode

    // ACTUAL LOGIC TO LINK TO LEETCODE GOES HERE
    


    // For demonstration, assuming success:
    setSnackbarMessage('LeetCode account linked successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography>Email: {user.email}</Typography>
        <TextField
          label="LeetCode Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={leetCodeUsername}
          onChange={(e) => setLeetCodeUsername(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={linkLeetCodeAccount} sx={{ mt: 2 }}>
          Link LeetCode Account
        </Button>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
