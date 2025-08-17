import { readJsonFile, writeJsonFile } from "../service/fileService.js";
import { hashPassword } from "../service/hashPassword.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment");
}

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!password || !email || !username) {
    return res.json({
      message: "All field required",
    });
  }

  try {
    const data = await readJsonFile("users.json");
    const alreadyExist = data.users.some((user) => user.email == email);

    if (alreadyExist)
      return res.json({
        message: "User already exist",
      });

    const encryptedPassword = await hashPassword(password.toString());
    const user = {
      id: data.users.length + 1,
      username,
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occured",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ message: "All field required" });
    const data = await readJsonFile("users.json");
    const user = data.users.find((u) => u.email == email);
    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      res.status(401).json({
        message: "Invalid Credentials",
      });
      return;
    }

    const token = jwt.sign({ sub: user.id, username: user.username, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
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
