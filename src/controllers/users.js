import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import User from "../models/users";

class UsersController {
  static async registerUser(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userId: uuidv4(),
      username,
      password: encryptedPassword,
      createdAt: dayjs().format("YYYY-MM-DD h:mm:ss A"),
    });

    const createdUser = await User.create(newUser);

    const token = jwt.sign(
      {
        username,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      createdUser,
      token,
      message: "user successfully created",
    });
  }

  static async loginUser(req, res) {
    const { username, password } = req.body;
    const loggedIn = await User.findOne({ username });
    if (!loggedIn)
      return res
        .status(400)
        .json({ message: "user does not exist. Check your username" });
    const checkPassword = await bcrypt.compare(password, loggedIn.password);
    if (!checkPassword)
      return res.status(400).json({ message: "invalid password" });

    const token = jwt.sign(
      {
        username,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    return res.header("access-token", token).status(201).json({
      token,
      message: "you have successfully logged in",
    });
  }
}

export default UsersController;
