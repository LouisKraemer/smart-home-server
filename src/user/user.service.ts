import * as bcrypt from "bcrypt";
import { isNil } from "ramda";
import * as jwt from "jsonwebtoken";

export const areFieldsMissing = ({ firstName, lastName, pseudo }) =>
  isNil(firstName) || isNil(lastName) || isNil(pseudo);

export const arePasswordsTheSame = (password, checkPassword) =>
  password === checkPassword;

export const hashPassword = password =>
  bcrypt.hash(password, parseInt(process.env.SALT, 10));

export const checkPassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

export const generateJWT = id => jwt.sign({ id }, process.env.JWT_SECRET_KEY);

export const checkJWT = token => {
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

export const extractIdFromJWT = token => {
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return id;
  } catch (error) {
    return false;
  }
};
