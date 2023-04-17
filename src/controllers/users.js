import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import User from "../models/users";

class UsersController {
  static async registerUser(req, res) {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "userName already in use" });
    }

    const newUser = new User({
      userId: uuidv4(),
      username,
      createdAt: dayjs().format("YYYY-MM-DD h:mm:ss A"),
    });

    const createdUser = await User.create(newUser);

    return res.status(201).json({
      createdUser,
      message: "user successfully created",
    });
  }

  static async loginUser(req, res) {
    const { username } = req.body;
    const loggedIn = await User.findOne({ username });
    if (!loggedIn)
      return res
        .status(400)
        .json({ message: "user does not exist. Check your username" });

    const token = jwt.sign(
      {
        username,
      },
      process.env.TOKEN_SECRET,
        { expiresIn: '7d' },
    );
    return res.header("access-token", token).status(200).json({
      token,
      message: "you have successfully logged in",
    });
  }
}

export default UsersController;
