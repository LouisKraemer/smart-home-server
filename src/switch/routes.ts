import { SINGLE, DOUBLE, TRIPLE, QUADRUPLE } from "./constants";

import { toggleYeelight } from "../yeelight/methods";

export const switchRoutes = {
  [SINGLE]: toggleYeelight
};
