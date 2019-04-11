const CronJob = require("cron").CronJob;

export const initPingYeelight = () => {
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
