import { ReactElement, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { handleLogin } from "./auth/handleLogin";
import { loadUserInfo, loadUserInfoData } from "./server";
import Button from "./components/Button";

const App = (): ReactElement => {
  const loadUserInfoCallback = (data: loadUserInfoData) => {
    setSignedIn(data.signedIn);
    if (data.display_name && data.profile_photo) {
      setDisplayName(data.display_name);
      setProfilePhoto(data.profile_photo);
    }
  };

  // TODO: Move functionality to another component
  const [profilePhoto, setProfilePhoto] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  // Get the user information
  useEffect(() => {
    loadUserInfo(loadUserInfoCallback);
  }, []);
  return (
    <>
      {/* Image string to be provided with no path 
        Props: 
        imageDetails?: image, altText :=
            Extension needs to be provided as well
            Example: image: "spotify.png"
            Alt Text required if image is included
        bgColor?: colour of the background of NavBar
      */}

      <NavBar
        imageDetails={{ image: "spotify_alt.png", altText: "Spotify Logo" }}
        bgColor="greenspotify"
      >
        Spotigit
      </NavBar>
      {!signedIn ? (
        <Button text="Log In" color="text-white" onClick={handleLogin} />
      ) : (
        // TODO: Create a separate component for this
        <>
          <img src={profilePhoto} alt="Profile Photo of user" />
          <h1 className="text-white">{displayName}</h1>
        </>
      )}
    </>
  );
};

export default App;
