const mongoose = require("mongoose");
mongoose.Promise = Promise;

const sleep = timeout =>
  new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

const initConnection = async () => {
  try {
    console.log("Trying to connect to mongodb");
    await mongoose.connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/smart-db`,
      {
        useNewUrlParser: true,
        autoReconnect: true,
        useFindAndModify: false
      }
    );
    console.log("Connected to database");
    return;
  } catch (error) {
    const timeout = 3000;
    console.log(`Error connecting to database, retrying in ${timeout} ms`);
    await sleep(timeout);
    return initConnection();
  }
};

module.exports = { initConnection };
