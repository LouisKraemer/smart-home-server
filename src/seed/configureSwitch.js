const { switches } = require("../../config");

const { upsertSwitch } = require("../switch/model");
const { getYeelight } = require("../yeelight/model");

const configureSwitches = async () =>
  Promise.all(
    switches.map(async ({ switchId, yeelightId }) => {
      const { _id } = await getYeelight({ deviceId: yeelightId });
      return upsertSwitch(switchId, { yeelight: _id });
    })
  );

module.exports = { configureSwitches };
