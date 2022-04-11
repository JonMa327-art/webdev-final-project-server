import userModel from "./users_model.js";

//finds all of the users
//the user model is db.users so it calls db.users.find()
const findAllUsers = async () => {
    return await userModel.find();
}

const createUser = async (user) => {
    return await userModel.create(user);
}

//contains all of the functions
const funcs = {
    findAllUsers,
    createUser
}

export default funcs;
