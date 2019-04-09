const { pluck } = require("ramda");

const { rooms } = require("../../config");

const { upsertRoomWithUsersAndYeelight } = require("../room/model");
const {
  findUserById,
  upsertUserWithRoom,
  findUserByPseudo
} = require("../user/model");
const {
  upsertYeelightWithRoom,
  findYeelightByDeviceId
} = require("../yeelight/model");

const updateUsersWithRoom = (userIds, roomId) =>
  Promise.all(
    userIds.map(async userId => {
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

const configureRooms = async () =>
  Promise.all(
    rooms.map(async ({ roomId, users, yeelights }) => {
      const usersPseudo = pluck("pseudo", users);
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

module.exports = { configureRooms };
