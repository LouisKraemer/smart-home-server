const { routes } = require("./routes");

const parseIncomingMessage = (userId, message) =>
  Promise.resolve(message)
    .then(JSON.parse)
    .then(({ type, payload }) => {
      if (!type) throw new Error("INVALID_INCOMING_MESSAGE");
      if (!routes[type]) throw new Error("INVALID_TYPE");
      console.log("type", type);
      console.log("payload", payload);
      return routes[type]({ ...payload, userId });
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
