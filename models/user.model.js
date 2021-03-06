const { Schema, model, models } = require("mongoose");
const emailRgx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordRgx = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailRgx, "Email is not valid"],
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user)
              .catch(() => false);
          },
          message: "This email already exists",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [passwordRgx, "Invalid password"],
    },
    lists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "List",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
