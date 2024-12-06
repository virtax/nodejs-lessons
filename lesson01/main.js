
const logger = require("./utils/logger")();

logger.log("test");
logger.warn("test error");

logger.log(process.env.LANG);