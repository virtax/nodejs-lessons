import logger from "./utils/logger.js"
import config from "config";
import "dotenv/config";

const { log, warn } = logger();
log("test log");
warn("test error !!!");

if (config.has("app_folder")) {
  log(config.get("app_folder"))
}

log(`MY_ENV from .env: ${process.env.MY_ENV}`);

log(config);
