const WebSocket = require("ws");

const { parseIncomingMessage } = require("./utils");

const wss = new WebSocket.Server({ port: 6768 });

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
