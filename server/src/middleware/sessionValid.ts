import { NextFunction, Request, Response } from "express";
import { refresh } from "../routes/auth/refresh";

export const sessionValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.session ||
    !req.session.accessToken ||
    !req.session.refreshToken ||
    !req.session.expiresAt
  ) {
    // Not signed in yet (since accessToken was not set)
    // Or Session Expired: This means login is required
    // Sending back this json takes user to Log-In Page Again
    res.status(401).json({ signedIn: false });
    return;
  }
  if (req.session.expiresAt < new Date().getTime()) {
    // Refresh tokens
    await refresh(
      req.session.refreshToken,
      (authInfo: { accessToken: string; expiresAt: number }) => {
        if (!req.session) {
          console.error("Session Expired while trying to refresh token");
          return;
        }
        req.session.accessToken = authInfo.accessToken;
        req.session.expiresAt = authInfo.expiresAt;
      }
    );
  }
  next();
};
