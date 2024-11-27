// types/express-session.d.ts
import { SessionData } from "express-session";

declare module "express-session" {
  export interface SessionData {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    user_id?: string;
  }
}
