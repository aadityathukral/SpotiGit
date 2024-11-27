import express, { Router } from "express";
import { sessionValid } from "../../middleware/sessionValid";
import {
  getUserInfo,
  getUserPlaylists,
} from "../../controllers/userController";
const routerUser: Router = express.Router();

routerUser.get("/playlists", sessionValid, getUserPlaylists);

routerUser.get("/info", sessionValid, getUserInfo);

export default routerUser;
