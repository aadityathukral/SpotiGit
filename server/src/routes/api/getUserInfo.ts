import express, { Request, Response, Router } from "express";
import { refresh } from "../auth/refresh";

const routerUserInfo: Router = express.Router();

// TODO: Include as part of the body of req what all is required
// to send back to the client : such as profile name,
// profile photo, etc (Add this later)
routerUserInfo.route("/").get(async (req: Request, res: Response) => {
  // If accessToken has expired
  // Get a new one using refresh
  if (
    !req.session ||
    !req.session.accessToken ||
    !req.session.refreshToken ||
    !req.session.expiresAt
  ) {
    // Not signed in yet (since accessToken was not set)
    // Or Session Expired: This means login is required
    // Sending back this json takes user to Log-In Page Again
    res.status(401).json({ signedIn: false });
    return;
  }
  if (req.session.expiresAt < new Date().getTime()) {
    await refresh(
      req.session.refreshToken,
      (authInfo: { accessToken: string; expiresAt: number }) => {
        if (!req.session) {
          console.error("Session Expired while trying to refresh token");
          return;
        }
        req.session.accessToken = authInfo.accessToken;
        req.session.expiresAt = authInfo.expiresAt;
      }
    );
  }
  const userInfoRaw = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + req.session.accessToken,
    },
  });

  if (userInfoRaw.status === 401) {
    console.error("Spotify API returned 401 Unauthorized. Invalid token?");
    res.status(401).json({ signedIn: false });
    return;
  }

  const userInfoJson: any = await userInfoRaw.json();
  console.log(userInfoJson);
  // Send relevant user info back to client: Profile name, Profile Photo, Playlists

  res.status(200).json({
    display_name: userInfoJson.display_name,
    profile_photo: userInfoJson.images[0].url,
    signedIn: true,
  });
});

export default routerUserInfo;
