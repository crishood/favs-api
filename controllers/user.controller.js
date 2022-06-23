const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const encPassword = await bcrypt.hash(password, Number(8));
      const user = await User.create({
        email,
        password: encPassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User created",
        data: {
          token,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(400).json({ message: "User could not be registered" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("User or password not valid");
      }
      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User logged",
        data: {
          token,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error: ${err}` });
    }
  },
  async list(req, res) {
    try {
      const users = await User.find().populate("lists", "name");
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(404).json({ message: "Users not found" });
    }
  },
  async destroy(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User destroyed", data: user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not be destroyed", data: err });
    }
  },
};
