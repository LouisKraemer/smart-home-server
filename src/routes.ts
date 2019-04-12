import { initUserRoutes } from "./user";

export const initRoutes = app => {
  initUserRoutes(app);

  app.get("*", function(req, res) {
    res.status(404).send();
  });
};
