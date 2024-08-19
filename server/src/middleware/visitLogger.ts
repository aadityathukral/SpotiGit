import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import { NextFunction, Request, Response } from "express";

/** Logs time and date (UTC) onto the csv table  */
const logVisit = async () => {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    const currDate: string = new Date().toISOString().split("T")[0];
    const currTime: string = new Date()
      .toISOString()
      .split("T")[1]
      .split(".")[0];
    console.log(new Date().toISOString());
    const data: string = `${currDate}, ${currTime}\n`;
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", "sign-in-data.csv"),
      data
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/** Logger middleware which tracks users when they access server */
export const logger = (req: Request, res: Response, next: NextFunction) => {
  logVisit();
  console.log("Logging new user...");
  next();
};
