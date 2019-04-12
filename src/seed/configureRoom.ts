import { pluck } from "ramda";

import { rooms } from "../../config";

import { upsertRoomWithUsersAndYeelight } from "../room";
import { findUserById, upsertUserWithRoom, findUserByPseudo } from "../user";
import { upsertYeelightWithRoom, findYeelightByDeviceId } from "../yeelight";

const updateUsersWithRoom = (userIds, roomId) =>
  Promise.all(
    userIds.map(async userId => {
      //@ts-ignore
      const { rooms } = await findUserById(userId);
      if (rooms.filter(room => room.equals(roomId)).length === 0) {
        return upsertUserWithRoom(userId, roomId);
      }
    })
  );

const updateYeelightsWithRoom = (yeelightIds, roomId) =>
  Promise.all(
    yeelightIds.map(yeelightId => upsertYeelightWithRoom(yeelightId, roomId))
  );

export const configureRooms = async () =>
  Promise.all(
    rooms.map(async ({ roomId, users, yeelights }) => {
      //@ts-ignore
      const usersPseudo = pluck("pseudo", users);
      //@ts-ignore
      const yeelightsId = pluck("deviceId", yeelights);
      const usersRef = await Promise.all(
        usersPseudo.map(async pseudo => {
          const { _id } = await findUserByPseudo(pseudo);
          return _id;
        })
      );
      const yeelightsRef = await Promise.all(
        yeelightsId.map(async deviceId => {
          const { _id } = await findYeelightByDeviceId(deviceId);
          return _id;
        })
      );
      const { _id } = await upsertRoomWithUsersAndYeelight(
        roomId,
        usersRef,
        yeelightsRef
      );
      await Promise.all([
        updateUsersWithRoom(usersRef, _id),
        updateYeelightsWithRoom(yeelightsRef, _id)
      ]);
    })
  );
