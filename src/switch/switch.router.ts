import { SINGLE } from "./switch.constants";

import { toggle } from "../yeelight";

export const switchRoutes = {
  [SINGLE]: toggle
};
