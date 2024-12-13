import logger from "./utils/logger"
import config from "config";
import "dotenv/config";

import logPackageName from "./simplePackageReader";
import PackageVersionReader from "./PackageVersionReader";

import eventsEmitter from "./eventsEmitter";
import testStreams from "./streams";

const { log, warn } = logger();
log("test log");
warn("test error !!!");


if (config.has("app_folder")) {
  log(config.get("app_folder"))
}

log(`MY_ENV from .env: ${process.env.MY_ENV}`);

log(config);

new PackageVersionReader();
logPackageName();

eventsEmitter.emit('hi', 'lesson 3');
eventsEmitter.emit('buy');

testStreams();

