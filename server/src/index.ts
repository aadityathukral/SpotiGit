import express, { Express } from "express";

// Configuring and starting HTTP server

const port: number = Number(process.env.PORT) || 8080;
const app: Express = express();

// Handle all API requests to server from ./src/api/routes.ts
app.listen(port, () => console.log(`Listening on port ${port}`));
