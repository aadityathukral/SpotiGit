import express, { Request, Response, Router } from "express";
import querystring from "querystring";
import { Buffer } from "node:buffer";
import { STATE, TOKEN_URI } from "../../config/spotifyOptions";
import User from "../../models/User";
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

  // Only request tokens if tokens have not already been set
  // Basically request if its the first time

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
    // console.log(data);
    if (!redirect_client_uri) {
      console.error("Redirect Client URI not working, fix dotenv");
      return;
    }
    if (!isCorrectAccessTokenRes(data)) {
      console.error("Not the correct access token res");
      return;
    }
    (req.session as any).accessToken = data.access_token;
    (req.session as any).refreshToken = data.refresh_token;

    // One hour from now, our access token expires
    (req.session as any).expiresAt =
      new Date().getTime() + 1000 * data.expires_in;
    console.log((req.session as any).expiresAt);
    // Redirects to the client w/ React code etc
    // Should I even be doing this over here?
    // Not entirely sure

    // TODO: Update this to something else later which will be more secure
    // Preferably a session storage and do it in a diff file (getUserInfo)
    // Put the action of creating a new User document into DB in another
    // file.

    // TODO: This code needs to be moved to another file
    const userInfoRaw = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + (req.session as any).accessToken,
      },
    });

    // TODO:
    // Remove any type and add TypeScript functionality here
    const userInfoJson: any = await userInfoRaw.json();
    // console.log(userInfoJson);
    try {
      const user = await User.findOne({
        spotifyUserId: userInfoJson.id,
      }).exec();
      // If user already exists in DB, don't create again
      if (user) {
        console.error("User already exists :OO");
        res.redirect(redirect_client_uri);
        return;
      }

      await User.create({
        username: userInfoJson.display_name,
        access_token: (req.session as any).accessToken,
        refresh_token: (req.session as any).refreshToken,
        expires_in: data.expires_in,
        spotifyUserId: userInfoJson.id,
      });
    } catch (err) {
      console.error(err);
      return;
    }
    res.redirect(redirect_client_uri);
    return;
  } catch (err) {
    res.status(500).send(`Authentication failed.\nError: ${err}`);
    console.error(err);
    return;
  }

  // TODO: Check if access token expired
  // Use Refresh Token to get new access token
  // -> Use it to get a new access token

  // if (req.session.expiresAt > Date.now()) {
  //   console.log("hello");
  //   console.log(handleRefresh());
  // }
  // res.redirect(redirect_client_uri);
});

export default routerCallback;
