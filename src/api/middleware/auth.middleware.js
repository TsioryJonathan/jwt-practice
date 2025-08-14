import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token || token.length == 0) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.email = data.email;
    return next();
  } catch (error) {
    console.error(error);
    res.json({
      message: "Internal Server Error",
    });
  }
};
