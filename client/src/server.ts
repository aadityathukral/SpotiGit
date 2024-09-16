import { isRecord } from "./utils";

type loadUserInfoCallback = (data: loadUserInfoData) => void;

export type loadUserInfoData = {
  signedIn: boolean;
  display_name?: string;
  profile_photo?: string;
};

export const loadUserInfo = async (cb: loadUserInfoCallback) => {
  try {
    const response = await fetch("http://localhost:8080/getUserInfo", {
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

type loadUserPlaylistsData = {
  signedIn: boolean;
  items?: any; // TODO: Change this later and make it more specific
};

// TODO: Write this method better, currently set as such due to testing
export const loadUserPlaylists = async (cb: loadUserPlaylistsCallback) => {
  try {
    const response = await fetch("http://localhost:8080/getUserPlaylists", {
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
    cb({ signedIn: true, items: jsonRes.items });
    console.log(response);
  } catch (err) {
    console.error(
      `Error fetching user playlists (or converting to json): ${err}`
    );
  }
};
