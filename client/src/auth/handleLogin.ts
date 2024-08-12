import { generateRandomString } from "../utils";

export const handleLogin = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const state = generateRandomString(16);
  const urlSettings = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope:
      "ugc-image-upload playlist-read-private playlist-modify-private playlist-modify-public",
    state: state,
    prompt: "login",
  });

  // Redirect to Authorization Page
  window.location.replace(
    `https://accounts.spotify.com/authorize?${urlSettings}`
  );
};
