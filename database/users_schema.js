import mongoose from "mongoose";

//creates the schema for the users
const usersSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String
}, { collection: "users" });

export default usersSchema