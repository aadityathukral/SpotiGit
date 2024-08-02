import { ReactElement } from "react";
import NavBar from "./components/NavBar";

const App = (): ReactElement => {
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
    </>
  );
};

export default App;
