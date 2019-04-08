const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const { initConnection } = require("./database");
const { discoverYeelight } = require("./yeelight/discover");

const { initWs } = require("./websocket");

const { initRoutes } = require("./routes");

initRoutes(app);

initConnection().then(() => {
  initWs();
  discoverYeelight();
  app.listen(process.env.EXPRESS_PORT, function() {
    console.log(`Http server started on port ${process.env.EXPRESS_PORT}`);
  });
});
