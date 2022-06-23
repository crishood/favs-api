const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Fav",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const List = model("List", listSchema);

module.exports = List;
