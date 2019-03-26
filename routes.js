const { initUserRoutes } = require("./src/user/routes");

const initRoutes = app => {
  initUserRoutes(app);

  app.get("*", function(req, res) {
    res.status(404).send();
  });
};

module.exports = { initRoutes };
