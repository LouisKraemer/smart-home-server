require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const { initConnection } = require("./src/database");
const { discoverYeelight } = require("./src/yeelight/discover");

const { initWs } = require("./src/websocket");

const { initRoutes } = require("./routes");

initRoutes(app);

app.listen(process.env.EXPRESS_PORT, function() {
  console.log(`Http server started on port ${process.env.EXPRESS_PORT}`);
});

initConnection().then(initWs);
// .then(discoverYeelight);
