import { GET } from "smart-home-config/yeelight";

import { IYeelight } from "./yeelight.interfaces";
import { broadcast } from "../websocket";

export const broadcastNewYeelightState = (
  deviceId: string,
  newState: Partial<IYeelight>
) =>
  broadcast(
    deviceId,
    JSON.stringify({
      type: GET,
      payload: { deviceId, ...newState }
    })
  );
