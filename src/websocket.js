const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 6768 });

const initWs = () => {
  console.log("dehzjnifpkd");
  wss.on("connection", ws => {
    ws.on("message", message => {
      console.log("received: %s", message);
    });

    ws.send("something");
  });
};

module.exports = {
  initWs
};
