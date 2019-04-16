import * as path from "path";

import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });

// import { initPingYeelight } from "./seed/cron";
import { initMQTT } from "./switch";

import * as express from "express";

const app = express();

import * as bodyParser from "body-parser";

app.use(bodyParser.json());

import { initConnection } from "./database";
import { discoverYeelight } from "./yeelight";
import { initWs } from "./websocket";
import { initRoutes } from "./routes";
import { configureRooms, configureSwitches } from "./seed";

initRoutes(app);

const init = async () => {
  await initConnection();
  if (process.env.CONFIG) {
    await Promise.all([
      // initPingYeelight(),
      initMQTT(),
      initWs(),
      discoverYeelight()
    ]);
  } else {
    await Promise.all([configureRooms(), configureSwitches()]);
    await Promise.all([initMQTT(), discoverYeelight()]);
  }
  app.listen(process.env.EXPRESS_PORT, function() {
    console.log(`Http server started on port ${process.env.EXPRESS_PORT}`);
  });
};

try {
  init();
} catch (error) {
  console.error("Error starting server", error);
}
