const Fav = require("../models/fav.model");
const List = require("../models/list.model");

module.exports = {
  async create(req, res) {
    try {
      const { listId } = req.params;
      const fav = await Fav.create({ ...req.body, list: listId });
      const list = await List.findById(listId);
      list.favs.push(fav);
      list.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Fav created", data: fav });
    } catch (err) {
      res.status(400).json({ message: "Fav could not be created", data: err });
    }
  },

  async show(req, res) {
    try {
      const { favId } = req.params;
      const fav = await Fav.findById(favId)
        .populate("listFavs", "name")
        .populate("user", "email");
      res.status(200).json({ message: "Fav found", data: fav });
    } catch (err) {
      res.status(404).json({ message: "Fav not found" });
    }
  },

  async destroy(req, res) {
    try {
      const { favId } = req.params;
      const fav = await Fav.findByIdAndDelete(favId);
      res.status(200).json({ message: "Fav destroyed", data: fav });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Fav could not be destroyed", data: err });
    }
  },
};
