import { Schema, model, models } from "mongoose";

const UserModel = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserModel);

export default User;
