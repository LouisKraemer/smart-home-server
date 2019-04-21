const rooms = [
  {
    roomId: "weegle_room",
    users: [{ pseudo: "Weegle" }],
    yeelights: [{ name: "Weegle's Room", deviceId: "0x0000000007dd1760" }]
  }
  // {
  //   roomId: "living_room",
  //   users: [{ pseudo: "Weegle" }],
  //   yeelights: [{ name: "Living Room", deviceId: "0x000000000458ad30" }]
  // }
];

const switches = [
  {
    switchId: "0x00158d00020415b8",
    yeelightId: "0x0000000007dd1760"
  }
];

module.exports = { rooms, switches };
