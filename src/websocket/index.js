const WebSocket = require("ws");

const { parseIncomingMessage } = require("./utils");
const { checkJWT, extractIdFromJWT } = require("../user/utils");
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

broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

setTimeout(() => broadcast("test"), 4000);

module.exports = {
  initWs,
  broadcast
};
