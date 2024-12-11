import colors from "colors/safe.js";

const logger = {
  log(message) {
    console.log(message);
  },
  warn(message) {
    console.error(colors.red(message));
  }
};

export default function getLogger() {
  return logger;
}
