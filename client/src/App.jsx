import { useEffect, useState } from 'react';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          {/* Sign out button and other authenticated user content */}
        </div>
      ) : (
        <div>
          <SignUp />
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default App;
