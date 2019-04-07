const bcrypt = require("bcrypt");
const { isNil } = require("ramda");
const jwt = require("jsonwebtoken");
const { findUserById } = require("./model");

const areFieldsMissing = ({ firstName, lastName, pseudo }) =>
  isNil(firstName) || isNil(lastName) || isNil(pseudo);

const arePasswordsTheSame = (password, checkPassword) =>
  password === checkPassword;

const hashPassword = password =>
  bcrypt.hash(password, parseInt(process.env.SALT, 10));

const checkPassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

const generateJWT = id => jwt.sign({ id }, process.env.JWT_SECRET_KEY);

const checkJWT = token => {
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  areFieldsMissing,
  arePasswordsTheSame,
  hashPassword,
  checkPassword,
  generateJWT,
  checkJWT
};
