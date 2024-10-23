import express, { Request, Response, Router } from "express";
const routerUser: Router = express.Router();

routerUser.get("/playlists", async (req: Request, res: Response) => {
  const session = req.session!;
  // Accessing Database
  // Might want to add caching layer
  const userPlaylistsRaw = await fetch(
    "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
    }
  );
  if (userPlaylistsRaw.status === 401) {
    console.error("Spotify API returned 401 Unauthorized. Invalid token?");
    res.status(401).json({ signedIn: false });
    return;
  }

  const userPlaylistsJson: any = await userPlaylistsRaw.json();
  console.log(userPlaylistsJson);
  // Send relevant user info back to client: Profile name, Profile Photo, Playlists
  const filteredPlaylists: any = userPlaylistsJson.items.filter(
    (playlist: any) => playlist.owner.display_name === "Thukral" // TODO: Change this hardcoded value to what the actual display name
  );
  res.status(200).json({
    playlists: filteredPlaylists,
  });
});

routerUser.get("/info", async (req: Request, res: Response) => {
  const session = req.session!;
  const userInfoRaw = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  if (userInfoRaw.status === 401) {
    console.error("Spotify API returned 401 Unauthorized. Invalid token?");
    res.status(401).json({ signedIn: false });
    return;
  }

  const userInfoJson: any = await userInfoRaw.json();
  // console.log(userInfoJson);
  // Send relevant user info back to client: Profile name, Profile Photo, Playlists

  res.status(200).json({
    display_name: userInfoJson.display_name,
    profile_photo: userInfoJson.images[0].url,
    signedIn: true,
  });
});

export default routerUser;
