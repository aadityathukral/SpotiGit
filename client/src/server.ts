import { isRecord } from "./utils";

type loadUserInfoCallback = (data: loadUserInfoData) => void;

export type loadUserInfoData = {
  signedIn: boolean;
  display_name?: string;
  profile_photo?: string;
};

export const loadUserInfo = async (cb: loadUserInfoCallback) => {
  try {
    const response = await fetch("http://localhost:8080/user/info", {
      credentials: "include", // Cookies to be included since sessions being used
    });
    console.log(response);
    if (response.status === 401) {
      // Unauthorized
      cb({ signedIn: false });
      return;
    }
    const jsonRes: any = await response.json();
    if (!isRecord(jsonRes) || jsonRes.signedIn === undefined) {
      console.error("Invalid json from /getUserInfo");
    }
    if (!jsonRes.signedIn) {
      cb({ signedIn: false });
    } else {
      if (!jsonRes.display_name || !jsonRes.profile_photo) {
        console.error(
          "Invalid json from /getUserInfo, should include display name and photo"
        );
      }
      cb({
        signedIn: true,
        display_name: jsonRes.display_name,
        profile_photo: jsonRes.profile_photo,
      });
    }
  } catch (err) {
    console.error(`Error fetching user info (or converting to json): ${err}`);
    return;
  }
};

type loadUserPlaylistsCallback = (playlists: loadUserPlaylistsData) => void;

export type loadUserPlaylistsData = {
  signedIn: boolean;
  items?: any; // TODO: Change this later and make it more specific
};

export const loadUserPlaylists = async (cb: loadUserPlaylistsCallback) => {
  try {
    const response = await fetch("http://localhost:8080/user/playlists", {
      credentials: "include",
    });
    if (response.status == 401) {
      // Unauthorized
      cb({ signedIn: false });
      return;
    }
    const jsonRes: any = await response.json();
    if (!isRecord(jsonRes)) {
      console.error("Invalid json from /getUserInfo");
      return;
    }
    cb({ signedIn: true, items: jsonRes.playlists });
  } catch (err) {
    console.error(
      `Error fetching user playlists (or converting to json): ${err}`
    );
  }
};

type Track = {
  added_at: string;
  track: {
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string }[];
    };
    duration_ms: number;
  };
};

type loadPlaylistTracksCallback = (data: loadPlaylistTracksData) => void;

export type loadPlaylistTracksData = {
  signedIn: boolean;
  items?: Track[];
};

export const loadPlaylistTracks = async (
  href: string,
  cb: loadPlaylistTracksCallback
) => {
  try {
    const response = await fetch("http://localhost:8080/playlist/tracks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ href: href }),
      credentials: "include",
    });

    if (response.status === 401) {
      // Unauthorized
      cb({ signedIn: false });
      return;
    }
    console.log(`This is the loadPlaylistTracks response`, response);
    const jsonRes: any = await response.json();
    if (!isRecord(jsonRes)) {
      console.error("Invalid json from /playlist/tracks");
      return;
    }
    console.log(jsonRes);
    cb({ signedIn: true, items: jsonRes.items as any });
  } catch (err) {
    console.error(
      `Error fetching playlist tracks (or converting to json): ${err}`
    );
    cb({ signedIn: true, items: [] });
  }
};

// TODO: Create functionality for additional info about each playlist
// type loadPlaylistCallback = (playlist: loadUserPlaylistsData) => void;

// export type loadPlaylistData = {
//   signedIn: boolean;
//   items?: any; // TODO: Change this later and make it more specific
// };

// export const loadPlaylist = async (id: string, cb: loadPlaylistCallback) => {};
