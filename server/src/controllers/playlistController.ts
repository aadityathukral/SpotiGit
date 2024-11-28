import { Request, Response } from "express";

export const getTracksFromPlaylist = async (req: Request, res: Response) => {
  console.log(req.body);
  const { href } = req.body;
  const session = req.session!;
  console.log(href);
  const playlistInfoRaw = await fetch(href, {
    headers: {
      Authorization: "Bearer " + session.accessToken,
    },
  });

  if (playlistInfoRaw.status === 401) {
    console.error("Spotify API returned 401 Unauthorized. Invalid token?");
    res.status(401).json({ signedIn: false });
    return;
  }

  const playlistInfoJson = await playlistInfoRaw.json();
  res.status(200).json({ items: playlistInfoJson.items });
  console.log(playlistInfoJson);
};
