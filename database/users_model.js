//imports the mongoose library and the user schema
import mongoose from "mongoose";
import usersSchema from "./users_schema.js";

//the usermodel us equvalent to db.users
const userModel = mongoose.model('userModel', usersSchema);

export default userModel