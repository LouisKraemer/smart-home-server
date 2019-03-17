const mongoose = require("mongoose");
mongoose.Promise = Promise;

const initConnection = () =>
  mongoose
    .connect("mongodb://localhost/smart-db", {
      useNewUrlParser: true,
      autoReconnect: true,
      useFindAndModify: false
    })
    .then(() => console.log("Connected to database"))
    .catch(err => {
      console.log("Error connecting to database, retrying in 1 second");
      setTimeout(initConnection, 1000);
    });

module.exports = { initConnection };
