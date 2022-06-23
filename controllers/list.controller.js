const List = require("../models/list.model");
const User = require("../models/user.model");

module.exports = {
  async list(req, res) {
    try {
      const userId = req.user;
      const list = await List.find({ user: userId })
        .populate("user", "email")
        .populate("favs", "title");
      res.status(200).json({ message: "Lists found", data: list });
    } catch (err) {
      res.status(404).json({ message: "Lists not found" });
    }
  },

  async show(req, res) {
    try {
      const { listId } = req.params;
      const list = await ListFavs.findById(listId)
        .populate("user", "email")
        .populate("favs", "title");
      res.status(200).json({ message: "List found", data: list });
    } catch (err) {
      res.status(404).json({ message: "List not found" });
    }
  },

  async create(req, res) {
    console.log("Intentando");
    try {
      const userId = req.user;
      const list = await List.create({ ...req.body, user: userId });
      const user = await User.findById(userId);
      user.lists.push(list);
      user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "List created", data: list });
    } catch (err) {
      res.status(400).json({ message: "List could not be created", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findByIdAndDelete(listId);
      res.status(200).json({ message: "List destroyed", data: list });
    } catch (err) {
      res
        .status(400)
        .json({ message: "List Favs could not be destroyed", data: err });
    }
  },
};
