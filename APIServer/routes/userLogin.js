const crypto = require("crypto");
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export default async (req, res, redis) => {
  const user = req.body;

  if (!user.password || !user.username) {
    return res.status(400).send({
      isAuth: false,
      message: "Invalid username or password",
    });
  }

  let userResult = await redis.get(user.username);
  if (!userResult) {
    return res.status(400).send({
      isAuth: false,
      message: "Invalid username or password",
    });
  }

  var hPassword = await crypto
    .createHash("md5")
    .update(user.password)
    .digest("hex");

  if (hPassword.toString() !== userResult.toString()) {
    return res.status(400).send({
      isAuth: false,
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign({ user }, "secretKey", { expiresIn: 60 * 60 });

  res.status(200).send({
    isAuth: true,
    token,
  });
};
