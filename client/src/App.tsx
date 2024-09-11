import { ReactElement, useEffect, useState } from "react";
import { handleLogin } from "./auth/handleLogin";
import { loadUserInfo, loadUserInfoData } from "./server";
import NavigationBar from "./components/NavigationBar";

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
      <NavigationBar onLoginClicked={handleLogin} profilePhoto={profilePhoto} />
    </>
  );
};

export default App;
