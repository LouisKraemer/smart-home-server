import { initUserRoutes } from "./user/routes";

export const initRoutes = app => {
  initUserRoutes(app);

  app.get("*", function(req, res) {
    res.status(404).send();
  });
};
