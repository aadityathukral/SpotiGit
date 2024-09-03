// TODO LATEST: Maybe don't need to make this an API
// endpoint.

// You will need to call if access token expires
// before any Spotify Web API Call

import { TOKEN_URI } from "../../config/spotifyOptions";
import dotenv from "dotenv";

dotenv.config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export type RefreshCallback = (authInfo: {
  accessToken: string;
  expiresAt: number;
}) => void;

/** Called when accessToken expires */
export const refresh = async (refreshToken: string, cb: RefreshCallback) => {
  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append(
    "Authorization",
    "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
  );

  const body: URLSearchParams = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", refreshToken);

  const response = await fetch(TOKEN_URI, {
    method: "POST",
    headers: headers,
    body: body,
  });
  const data: any = await response.json();
  const authInfo = {
    accessToken: data.access_token as string,
    expiresAt: data.expires_in * 1000 + new Date().getTime(),
  };
  cb(authInfo);
};
