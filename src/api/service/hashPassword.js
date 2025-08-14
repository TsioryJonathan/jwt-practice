import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
  if (!plainPassword || plainPassword.length < 10) return "Error saving the password";
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);

  return hashedPassword;
};
