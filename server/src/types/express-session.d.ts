// types/express-session.d.ts
// TODO: FIX THIS IT IS NOT WORKING
import { SessionData } from "express-session";

declare module "express-session" {
  export interface SessionData {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}
