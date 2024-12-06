
const logger = {
  log(message) {
    console.log(message);
  },
  warn(message) {
    console.error(message);
  }
};

module.exports = function getLogger() {
  return logger;
}



