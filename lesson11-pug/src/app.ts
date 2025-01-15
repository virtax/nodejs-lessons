import config from "config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpLogger from "./middleware/httpLogger";
import userRouter from "./routes/userRouter";
import { databaseService } from "./services/DatabaseService";
import logger from "./utils/logger"
import userAdminRouter from "./routes/userAdminRouter";
const { log, warn, error } = logger("app");

const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

app.set('view engine', 'pug');
app.set('views', './src/views');

// Middleware for JSON parsing
app.use(express.json());
// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use(httpLogger);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, World!");
// });

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.use("/", userAdminRouter);

// Use the userRouter and set the base path to /api/v1/users
app.use("/api/v1/users", userRouter);

// Global error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
  error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

async function handleShutdown(signal: string): Promise<void> {
  log(`Received ${signal}. Closing postgreSQL connection...`);
  await databaseService.disconnect();
  log(`${signal} handled. Exiting process.`);
  process.exit(0);
}
