import { createUser, login } from "./methods";

export const initUserRoutes = app => {
  app.post("/user", async (req, res) => {
    try {
      await createUser(req.body);
      res.status(200).send();
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const token = await login(req.body);
      res.status(200).send(token);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
};
