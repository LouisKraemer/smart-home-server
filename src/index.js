const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { configureRooms } = require("./seed/configureRoom");
const { configureSwitches } = require("./seed/configureSwitch");
const { initPingYeelight } = require("./seed/cron");
const { initMQTT } = require("./switch/listener");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const { initConnection } = require("./database");
const { discoverYeelight } = require("./yeelight/discover");

const { initWs } = require("./websocket");

const { initRoutes } = require("./routes");

initRoutes(app);

init = async () => {
  await initConnection();
  await configureRooms();
  await configureSwitches();
  await Promise.all([
    // initPingYeelight(),
    initMQTT(),
    initWs(),
    discoverYeelight()
  ]);
  app.listen(process.env.EXPRESS_PORT, function() {
    console.log(`Http server started on port ${process.env.EXPRESS_PORT}`);
  });
};

try {
  init();
} catch (error) {
  console.error("Error starting server", error);
}
