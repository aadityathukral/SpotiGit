import { REFRESH_TOKEN } from "./callback";
import dotenv from "dotenv";
dotenv.config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const handleRefresh = async () => {
  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append(
    "Authorization",
    "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
  );
  const body: URLSearchParams = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", REFRESH_TOKEN);
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: headers,
    body: body,
  });
  const data: any = await response.json();
  console.log(data);
};
