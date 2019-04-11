const CronJob = require("cron").CronJob;

const initPingYeelight = () => {
  new CronJob(
    "* * * * * *",
    () => {
      console.log("You will see this message every second");
    },
    null,
    true,
    "Europe/Paris"
  );
};

module.exports = {
  initPingYeelight
};
