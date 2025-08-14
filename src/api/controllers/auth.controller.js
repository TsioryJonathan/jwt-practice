import { readJsonFile, writeJsonFile } from "../service/fileService.js";
import { hashPassword } from "../service/hashPassword.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment");
}

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.json({
      message: "All field required",
    });
  }

  const data = await readJsonFile("users.json");
  const alreadyExist = data.users.some((user) => user.email == email);

  if (alreadyExist)
    return res.json({
      message: "User already exist",
    });

  const encryptedPassword = await hashPassword(password.toString());
  const user = {
    id: data.users.length + 1,
    email,
    password: encryptedPassword,
  };
  const users = data.users;
  users.push(user);

  await writeJsonFile(
    {
      users,
    },
    "users.json",
  );

  res.status(200).json({
    message: "User Created succesfully",
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ message: "All field required" });
    const data = await readJsonFile("users.json");
    const user = data.users.find((u) => u.email == email);
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({
      message: "User succesfully logged in",
      token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      Message: "Internal Server Error",
    });
  }
};
