import userModel from "./users_model.js";

//finds all of the users
//the user model is db.users so it calls db.users.find()
const findAllUsers = async () => {
    return await userModel.find();
}

const findUserBycredentials = async (userName, passWord) => {
    return await userModel.findOne({
        username: userName,
        password: passWord
    })
}

const findUserByEmail = async (email) => {
    return await userModel.find({ "email": email });
}

//creates a new user
//the user model is db.users so it calls db.users.insert()
const createUser = async (user) => {
    return await userModel.create(user);
}

//updates a user
const updateUser = async (userEmail, user) => {
    console.log("dao" + userEmail)
    console.log(user)
    return await userModel.updateOne({ email: userEmail }, { $set: user })
}
//updates a user
const deleteUser = async (uid) => {
    return await userModel.updateOne({ _id: uid })
}

//contains all of the functions
const funcs = {
    findAllUsers,
    findUserByEmail,
    findUserBycredentials,
    createUser,
    updateUser,
    deleteUser
}

export default funcs;
