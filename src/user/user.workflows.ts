import { isNil } from "ramda";

import {
  createUser as createUserInDB,
  findUserByPseudo
} from "./user.repository";
import {
  areFieldsMissing,
  arePasswordsTheSame,
  hashPassword,
  checkPassword,
  generateJWT
} from "./user.service";
import {
  PASSWORDS_ARE_NOT_THE_SAME,
  FIELDS_MISSING,
  USER_NOT_FOUND,
  INCORRECT_PASSWORD,
  USER_ALREADY_EXISTS
} from "./user.constants";

export const createUser = async ({ password, checkPassword, ...rest }) => {
  //@ts-ignore
  if (areFieldsMissing(rest)) throw new Error(FIELDS_MISSING);
  const alreadyExistingUser = await findUserByPseudo(rest.pseudo);
  if (alreadyExistingUser) throw new Error(USER_ALREADY_EXISTS);
  if (!arePasswordsTheSame(password, checkPassword))
    throw new Error(PASSWORDS_ARE_NOT_THE_SAME);
  const hashedPassword = await hashPassword(password);
  const user = await createUserInDB({ ...rest, password: hashedPassword });
  const token = generateJWT(user._id);
  return token;
};

export const login = async ({ pseudo, password }) => {
  const user = await findUserByPseudo(pseudo);
  if (isNil(user)) throw new Error(USER_NOT_FOUND);
  //@ts-ignore
  const isPasswordGood = await checkPassword(password, user.password);
  if (!isPasswordGood) throw new Error(INCORRECT_PASSWORD);
  const token = generateJWT(user._id);
  return token;
};
