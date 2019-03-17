const { initConnection } = require("./src/database");
const { discoverYeelight } = require("./src/yeelight/discover");

const { initWs } = require("./src/websocket");

initConnection()
  .then(initWs)
  .then(discoverYeelight);
