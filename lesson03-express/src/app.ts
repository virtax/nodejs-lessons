import config from "config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpLogger from "./middleware/httpLogger";
import usersRouter from "./routes/users";

import logger from "./utils/logger"
import { HTTPError } from "./errors/httpErrors";
const { log, warn, error } = logger("app");

const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

// Middleware for JSON parsing
app.use(express.json());

// one more Middleware
// app.use( (req: Request, res: Response, next: NextFunction) => {
//   log("one more log 1");
//   next();
// });


// Custom Middleware
app.use(httpLogger);

// one more Middleware 2
// app.use( (req: Request, res: Response, next: NextFunction) => {
//   log("one more log 2");
//   next();
// });


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// User Routes
app.use("/api/users", usersRouter);

// Global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  if (err instanceof HTTPError) {
    statusCode = (err as HTTPError).statusCode;
  }
  error("Error:", err.message);
  res.status(statusCode).json({ someinfo: "Global error handler", error: err.message });
});

// Start the server
app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
