import { switches } from "../../config";

import { upsertSwitch } from "../switch";
import { getYeelight } from "../yeelight";

export const configureSwitches = async () =>
  Promise.all(
    switches.map(async ({ switchId, yeelightId }) => {
      const { _id } = await getYeelight({ deviceId: yeelightId });
      return upsertSwitch(switchId, { yeelight: _id });
    })
  );
