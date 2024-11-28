import { Request, Response } from "express";

export const getUserPlaylists = async (req: Request, res: Response) => {
  const session = req.session!;
  // Accessing Database
  // Might want to add caching layer

  // TODO: Make this modular (Fit the DRY principle)
  // I might've made this case impossible from the client side at least
  if (!session.user_id) {
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
    console.log(userInfoJson);
    req.session!.user_id = userInfoJson.id;
  }
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
  // console.log(userPlaylistsJson);
  // Send relevant user info back to client: Profile name, Profile Photo, Playlists
  const filteredPlaylists: any = userPlaylistsJson.items.filter(
    (playlist: any) => playlist && playlist.owner.id === session.user_id
  );
  // console.log(filteredPlaylists);
  res.status(200).json({
    playlists: filteredPlaylists,
  });
};

export const getUserInfo = async (req: Request, res: Response) => {
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
  req.session!.user_id = userInfoJson.id;
  // Send relevant user info back to client: Profile name, Profile Photo, Playlists

  res.status(200).json({
    display_name: userInfoJson.display_name,
    profile_photo: userInfoJson.images[0].url,
    signedIn: true,
  });
};
