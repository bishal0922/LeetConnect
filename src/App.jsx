import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LangingPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Verify from './components/Verify';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
