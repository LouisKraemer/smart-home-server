import * as path from "path";

import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });

import { configureRooms } from "./seed/configureRoom";
import { configureSwitches } from "./seed/configureSwitch";
import { initPingYeelight } from "./seed/cron";
import { initMQTT } from "./switch/listener";

import * as express from "express";

const app = express();

import * as bodyParser from "body-parser";

app.use(bodyParser.json());

import { initConnection } from "./database";
import { discoverYeelight } from "./yeelight/discover";

import { initWs } from "./websocket";

import { initRoutes } from "./routes";

initRoutes(app);

const init = async () => {
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
