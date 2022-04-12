import userModel from "./users_model.js";

//finds all of the users
//the user model is db.users so it calls db.users.find()
const findAllUsers = async () => {
    return await userModel.find();
}

const findUserBycredentials = async (username, password) => {
    userModel.findOne({
        username: username,
        password: password
    })
}

//creates a new user
//the user model is db.users so it calls db.users.insert()
const createUser = async (user) => {
    return await userModel.create(user);
}

//updates a user
const updateUser = async (uid, user) => {
    return await userModel.updateOne({ _id: tid }, { $set: user })
}

//updates a user
const deleteUser = async (uid) => {
    return await userModel.updateOne({ _id: tid })
}

//contains all of the functions
const funcs = {
    findAllUsers,
    createUser,
    updateUser,
    deleteUser
}

export default funcs;
