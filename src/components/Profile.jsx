import { useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { Container } from '@mui/material';
import ProfileDetails from './ProfileDetails'; // Make sure the import path matches where you saved the component

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Current user:", currentUser.email)
        fetchUserProfile(currentUser.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (email) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/api/user-data`, {
        params: { email }
      });
      if (response.data.success && response.data.user) { // Check if your backend sends a success flag and user data
        const user = response.data.user;
        // Assuming leetCodeUsername is part of the user's profile information
        const leetCodeUsername = user.leetCodeUsername;
        const leetCodeResponse = await axios.get(`https://alfa-leetcode-api.onrender.com/${leetCodeUsername}/solved`);
        console.log(leetCodeResponse.data)
        console.log(leetCodeResponse.data.solvedProblem)
        const problemsSolved = leetCodeResponse.data.solvedProblem; // Adjust based on the actual response structure

  
        // Add the number of problems solved to the user profile object
        const userProfile = {
          ...user,
          problemsSolved
        };
  
        setProfile(userProfile);
      } else {
        // Handle scenario where fetch is successful but user data isn't found or another issue occurred
        console.log('Fetch successful but no profile data:', response.data.message);
        setProfile(null); // Or keep the existing profile state, depending on your needs
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* Pass the fetched profile data as a prop to ProfileDetails */}
      <ProfileDetails profile={profile} />
    </Container>
  );
};

export default Profile;
