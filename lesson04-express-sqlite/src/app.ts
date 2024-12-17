import config from "config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpLogger from "./middleware/httpLogger";
import usersRouter from "./routes/usersRouter";
import { dbService } from "./services/DatabaseService";


import logger from "./utils/logger"
const { log, warn, error } = logger("app");

const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

// Middleware for JSON parsing
app.use(express.json());

// Custom Middleware
app.use(httpLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Use the usersRouter and set the base path to /api/v1/users
app.use("/api/v1/users", usersRouter);

// Global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});

// Closing connection when server shuts down
process.on('exit', () => {
  log('process on exit')
  dbService.close();
});
