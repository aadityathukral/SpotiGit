import { ReactElement, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { handleLogin } from "./auth/handleLogin";
import { loadUserInfo, loadUserInfoData } from "./server";
import NavigationBar from "./components/NavigationBar";
import LoginPage from "./pages/LoginPage"; // Create a new login component
import HomePage from "./pages/HomePage"; // Create a new home component
import TermsPage from "./pages/TermsPage";

const App = (): ReactElement => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Callback to set user information
  const loadUserInfoCallback = (data: loadUserInfoData) => {
    setIsSignedIn(data.signedIn);
    if (data.profile_photo) {
      setProfilePhoto(data.profile_photo);
    }
  };

  // Load user info on component mount
  useEffect(() => {
    loadUserInfo(loadUserInfoCallback);
  }, []);

  return (
    <Router>
      <NavigationBar
        onLoginClicked={handleLogin}
        profilePhoto={profilePhoto}
        onPlaylistsClicked={() => {}} // Define your playlists handler
      />
      <Routes>
        <Route
          path="/login"
          element={isSignedIn ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={isSignedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
