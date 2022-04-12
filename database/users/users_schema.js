import mongoose from "mongoose";

//creates the schema for the users
const usersSchema = mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, require: true }
}, { collection: "users" });

export default usersSchema