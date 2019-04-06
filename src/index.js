require("dotenv").config();

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

// const { GET_ALL } = require("smart-home-config");

// console.log("GET_ALL", GET_ALL);
