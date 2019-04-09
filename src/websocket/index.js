const WebSocket = require("ws");

const { parseIncomingMessage } = require("./utils");
const { checkJWT, extractIdFromJWT } = require("../user/utils");
const { isUserAllowedToReceiveUpdates } = require("../yeelight/utils");
const { UNAUTHORIZED } = require("./constants");

const wss = new WebSocket.Server({
  port: process.env.WEBSOCKET_PORT,
  verifyClient: (info, cb) => {
    const token = info.req.url.substring(1);
    if (!token) cb(false, 401, UNAUTHORIZED);
    else {
      const isJWTValid = checkJWT(token);
      if (isJWTValid) {
        cb(true);
      } else {
        cb(false, 401, UNAUTHORIZED);
      }
    }
  }
});

const initWs = () => {
  wss.on("connection", (ws, request) => {
    console.log("New ws connection !");
    const token = request.url.substring(1);
    const id = extractIdFromJWT(token);
    ws.userId = id;
    ws.on("message", async message => {
      try {
        const { shouldRespond, payload } = await parseIncomingMessage(
          id,
          message
        );
        if (shouldRespond) ws.send(payload);
      } catch (error) {
        console.error(`Error executing message ${message}`);
      }
    });
  });
};

broadcast = (deviceId, message) => {
  wss.clients.forEach(async client => {
    const userShouldBeUpdated = await isUserAllowedToReceiveUpdates(
      deviceId,
      client.userId
    );
    if (userShouldBeUpdated && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

module.exports = {
  initWs,
  broadcast
};
