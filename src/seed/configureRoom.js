const { pluck } = require("ramda");

const { rooms } = require("../../config");

const { upsertRoomWithUsersAndYeelight } = require("../room/model");
const { findUserById, upsertUserWithRoom } = require("../user/model");

const updateUsersWithRoom = (userIds, roomId) =>
  Promise.all(
    userIds.map(async userId => {
      const { rooms } = await findUserById(userId);
      if (rooms.filter(room => room.equals(roomId)).length === 0) {
        return upsertUserWithRoom(userId, roomId);
      }
    })
  );

const configureRooms = async () =>
  Promise.all(
    rooms.map(async ({ roomId, users, yeelights }) => {
      const usersRef = pluck("_id", users);
      const yeelightsRef = pluck("_id", yeelights);
      const { _id } = await upsertRoomWithUsersAndYeelight(
        roomId,
        usersRef,
        yeelightsRef
      );
      await updateUsersWithRoom(usersRef, _id);
    })
  );

module.exports = { configureRooms };
