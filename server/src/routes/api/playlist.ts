import express, { Router } from "express";
import { sessionValid } from "../../middleware/sessionValid";
import { getTracksFromPlaylist } from "../../controllers/playlistController";

const routerPlaylist: Router = express.Router();

routerPlaylist.post("/tracks", sessionValid, getTracksFromPlaylist);

export default routerPlaylist;
