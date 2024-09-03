import express, { Request, Response, Router } from "express";
import querystring from "querystring";
import { Buffer } from "node:buffer";
import { STATE, TOKEN_URI } from "../../config/spotifyOptions";
import { isCorrectAccessTokenRes } from "../../config/customTypes";
import dotenv from "dotenv";

dotenv.config();

const routerCallback: Router = express.Router();
const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_client_uri = process.env.REDIRECT_CLIENT_URI as string;

routerCallback.route("/").get(async (req: Request, res: Response) => {
  if (!redirect_uri) {
    console.error("Redirect URI not working, fix dotenv");
    return;
  }

  const code: string | null = (req.query.code as string) || null;
  const queryState: string | null = (req.query.state as string) || null;

  // Mismatch errors
  if (queryState === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
    return;
  }

  if (queryState !== STATE) {
    res.status(401).redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
          state: queryState,
        })
    );
    return;
  }

  // TODO: Update this accordingly
  // Check the Spotify Web API specifications
  if (!code) {
    return res.sendStatus(400);
  }

  try {
    // Requesting tokens at token URI
    // Only need to request tokens if expired
    //
    // Otherwise can proceed with making requests
    // And redirect to dashboard
    const authHeader: Headers = new Headers();
    authHeader.append("Content-Type", "application/x-www-form-urlencoded");
    authHeader.append(
      "Authorization",
      "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
    );

    const urlencodedBody: URLSearchParams = new URLSearchParams();
    urlencodedBody.append("grant_type", "authorization_code");
    urlencodedBody.append("code", code);
    urlencodedBody.append("redirect_uri", redirect_uri);

    // Making a post request to get access/refresh token
    const response = await fetch(TOKEN_URI, {
      method: "POST",
      headers: authHeader,
      body: urlencodedBody,
    });

    const data = await response.json();

    if (!redirect_client_uri) {
      console.error("Redirect Client URI not working, fix dotenv");
      return;
    }
    if (!isCorrectAccessTokenRes(data)) {
      console.error("Not the correct access token res");
      return;
    }

    // TODO: This is a bit suspicious, how can you have req.session
    // invalid in this case? Callback is triggered through browser
    // and Node will validate a session here

    // This is an impossible case:
    if (!req.session) {
      console.error("Session not set");
      res.status(401).json({ signedIn: false }); // Illegal Source / Unauthorized
      return;
    }
    req.session.accessToken = data.access_token;
    req.session.refreshToken = data.refresh_token;

    // One hour from now, our access token expires
    req.session.expiresAt = new Date().getTime() + 1000 * data.expires_in;
    console.log(req.session);
    res.redirect(redirect_client_uri);
    return;
  } catch (err) {
    res.status(500).send(`Authentication failed.\nError: ${err}`);
    console.error(err);
    return;
  }
});

export default routerCallback;
