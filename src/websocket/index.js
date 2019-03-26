const WebSocket = require("ws");

const { parseIncomingMessage } = require("./utils");
const { checkJWT } = require("../user/utils");
const { UNAUTHORIZED } = require("./constants");

const wss = new WebSocket.Server({
  port: process.env.WEBSOCKET_PORT,
  verifyClient: (info, cb) => {
    const token = info.req.headers.token;
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
  wss.on("connection", ws => {
    console.log("New ws connection !");
    ws.on("message", message =>
      Promise.resolve(message)
        .then(parseIncomingMessage)
        .then(({ shouldRespond, payload }) => {
          if (shouldRespond) ws.send(payload);
        })
    );
  });
};

broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

module.exports = {
  initWs,
  broadcast
};
