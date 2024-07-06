import { useEffect, useState } from 'react';
import './App.css';
import Homepage from './Pages/Homepage';
import LoginRegisterPage from './Pages/LoginRegisterPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {

  const [loggedInUser, setloggedInUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setloggedInUser(uid)
      }
    });
  }, [])

  return (
    <div className=" ">
      {
        loggedInUser ? (<Homepage />) : (<LoginRegisterPage />)
      }
    </div>
  );
}

export default App;
