const mongoose = require("mongoose");
const { isNil } = require("ramda");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  pseudo: String,
  password: String
});

const User = mongoose.model("User", userSchema);

const createUser = user => new User(user).save();

const findUserByPseudo = pseudo => User.findOne({ pseudo }).exec();

const findUserById = id => User.findById(id).exec();

module.exports = {
  createUser,
  findUserByPseudo,
  findUserById
};
