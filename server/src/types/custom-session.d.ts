// types/express-session.d.ts
// TODO: FIX THIS IT IS NOT WORKING
import "express-session";

declare module "express-session" {
  interface SessionData {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}
