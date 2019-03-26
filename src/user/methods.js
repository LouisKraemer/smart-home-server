const { isNil } = require("ramda");

const { createUser: createUserInDB, findUserByPseudo } = require("./model");
const {
  areFieldsMissing,
  arePasswordsTheSame,
  hashPassword,
  checkPassword,
  generateJWT
} = require("./utils");
const {
  PASSWORDS_ARE_NOT_THE_SAME,
  FIELDS_MISSING,
  USER_NOT_FOUND,
  INCORRECT_PASSWORD,
  USER_ALREADY_EXISTS
} = require("./constants");

const createUser = async ({ password, checkPassword, ...rest }) => {
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

const login = async ({ pseudo, password }) => {
  const user = await findUserByPseudo(pseudo);
  if (isNil(user)) throw new Error(USER_NOT_FOUND);
  const isPasswordGood = await checkPassword(password, user.password);
  if (!isPasswordGood) throw new Error(INCORRECT_PASSWORD);
  const token = generateJWT(user._id);
  return token;
};

module.exports = {
  createUser,
  login
};
