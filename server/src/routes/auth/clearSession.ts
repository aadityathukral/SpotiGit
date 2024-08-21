import express, { Router } from "express";

const routerSessionClear: Router = express.Router();

routerSessionClear.route("/").post((req, res) => {
  if (!req.session) {
    res.status(200).send("No session found");
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(`Unable to clear the session. Error: ${err}`);
      return;
    }
    res.status(200).send("Session cleared");
  });
});

export default routerSessionClear;
