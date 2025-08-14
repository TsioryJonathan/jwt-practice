import { readJsonFile, writeJsonFile } from "../service/fileService.js";
import { hashPassword } from "../service/hashPassword.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.json({
      message: "All field required",
    });
  }

  const encryptedPassword = await hashPassword(password.toString());
  const user = {
    email,
    password: encryptedPassword,
  };
  const data = await readJsonFile("users.json");
  const users = data.users;
  users.push(user);

  console.log(data);

  await writeJsonFile(users, "users.json");

  res.status(200).json({
    message: "User Created succesfully",
  });
};
