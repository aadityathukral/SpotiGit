import { randomBytes } from "node:crypto";

export const SCOPE: string =
  "ugc-image-upload playlist-read-private playlist-modify-private playlist-modify-public user-read-private";

export const STATE: string = randomBytes(16).toString("hex");

export const TOKEN_URI = "https://accounts.spotify.com/api/token";

export const AUTH_URI = "https://accounts.spotify.com/authorize";
