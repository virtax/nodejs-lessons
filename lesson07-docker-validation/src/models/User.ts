import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  age: { type: Number, min: 18, required: true },
});

export const User = mongoose.model('User', UserSchema);
