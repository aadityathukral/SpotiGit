import { ReactElement, useEffect, useState } from "react";
import { handleLogin } from "./auth/handleLogin";
import { loadUserInfo, loadUserInfoData } from "./server";
import NavigationBar from "./components/NavigationBar";
import AppDescription from "./components/AppDescription";
import { handlePlaylists } from "./handlePlaylists";

const App = (): ReactElement => {
  const loadUserInfoCallback = (data: loadUserInfoData) => {
    if (data.profile_photo) {
      setProfilePhoto(data.profile_photo);
    }
  };

  const [profilePhoto, setProfilePhoto] = useState("");

  // Get the user information
  useEffect(() => {
    loadUserInfo(loadUserInfoCallback);
  }, []);
  return (
    <>
      <NavigationBar
        onLoginClicked={handleLogin}
        profilePhoto={profilePhoto}
        onPlaylistsClicked={handlePlaylists}
      />
      <AppDescription />
    </>
  );
};

export default App;
