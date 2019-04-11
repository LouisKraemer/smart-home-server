const { SINGLE, DOUBLE, TRIPLE, QUADRUPLE } = require("./constants");

const { toggleYeelight } = require("../yeelight/methods");

const switchRoutes = {
  [SINGLE]: toggleYeelight
};

module.exports = {
  switchRoutes
};
