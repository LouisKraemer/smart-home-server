import { IYeelight } from "./yeelight.interfaces";
import { IYeelightModel, Yeelight } from "./yeelight.model";

export const upsertYeelight = (
  deviceId: string,
  props: Partial<IYeelight>
): Promise<IYeelightModel> =>
  Yeelight.findOneAndUpdate({ deviceId }, props, { upsert: true }).exec();

export const upsertYeelightWithRoom = (
  id: string,
  roomId: string
): Promise<IYeelightModel> =>
  Yeelight.findByIdAndUpdate(id, { room: roomId }).exec();

export const getYeelights = (): Promise<IYeelightModel[]> =>
  Yeelight.find(
    {},
    "deviceId name power bright rgb connected ct color_mode"
  ).exec();

export const getYeelight = ({
  deviceId
}: Partial<IYeelight>): Promise<IYeelightModel> =>
  Yeelight.findOne(
    { deviceId },
    "deviceId name power bright rgb connected ct color_mode"
  ).exec();

export const findYeelightByDeviceId = (
  deviceId: string
): Promise<IYeelightModel> => Yeelight.findOne({ deviceId }).exec();

export const getRoomFromYeelight = (
  deviceId: string
): Promise<IYeelightModel> =>
  Yeelight.findOne({ deviceId })
    .populate("room")
    .exec();
