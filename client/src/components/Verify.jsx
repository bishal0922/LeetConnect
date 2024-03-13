import { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Link } from '@mui/material';
import axios from 'axios';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const Verify = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [leetCodeUsername, setLeetCodeUsername] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);


  const fetchUserToken =  async (email) => {
    try {
        // Make a GET request to the backend to fetch the user token
        const response = await axios.get('http://localhost:3001/user/get-user-token', {
          params: { email }
        });
    
        if (response.data.success) {
          //display a window that displays the token and then a button to copy the token and a button to click "verify" which will call the verify-token route
          setToken(response.data.token);
          setOpenModal(true);
        } else {
          setSnackbarMessage('Failed to link LeetCode account. Please try again.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error('Error linking LeetCode account:', error);
        setSnackbarMessage('An error occurred while linking LeetCode account. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setSnackbarMessage('Token copied to clipboard.');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/verify-token',{
        email: user.email,
        token: token, // Replace 'token value' with the actual token value
        leetCodeUsername: leetCodeUsername // Make sure leetCodeUsername state is properly set
    });
      if (response.data.success) {
        setSnackbarMessage('Token verified successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        // Close the modal
        setOpenModal(false);

        // Redirect to the profile page after successful verification
        navigate('/profile');
      } else {
        setSnackbarMessage('Failed to verify token.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setSnackbarMessage('An error occurred while verifying token. Please try again later.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
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
          Verify your LeetCode Account
        </Typography>
        <TextField
          label="LeetCode Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={leetCodeUsername}
          onChange={(e) => setLeetCodeUsername(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => fetchUserToken(user.email)} sx={{ mt: 2 }}>
          Link LeetCode Account
        </Button>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Modal for leetcode account linking instruction */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Verify</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please add the following token to your LeetCode bio:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1" sx={{ mr: 1 }}>{token}</Typography>
            <IconButton onClick={handleCopyToken} color="primary" aria-label="copy token">
              <FileCopyIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Instructions: <br />
            1. Go to <Link href={`https://leetcode.com/${leetCodeUsername}`} target="_blank">leetcode.com/{leetCodeUsername}</Link> <br />
            2. Put the above token anywhere within your bio section. <br />
            3. After adding the token, click the "Verify" button below.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerify} color="primary">Verify</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};
export default Verify;
