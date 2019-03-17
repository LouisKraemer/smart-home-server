const { routes } = require("./routes");

const parseIncomingMessage = message =>
  Promise.resolve(message)
    .then(JSON.parse)
    .then(({ endpoint, payload }) => {
      if (!endpoint) throw new Error("INVALID_INCOMING_MESSAGE");
      if (!routes[endpoint]) throw new Error("INVALID_ENDPOINT");
      console.log("endpoint", endpoint);
      console.log("payload", payload);
      return routes[endpoint](payload);
    })
    .then(({ shouldRespond, payload }) => ({
      shouldRespond,
      payload: JSON.stringify(payload)
    }))
    .catch(err => {
      console.log("Error parsing incoming message", err);
    });

module.exports = {
  parseIncomingMessage
};
