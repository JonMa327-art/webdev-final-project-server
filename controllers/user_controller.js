//imports the tuits from a json
import people from "../data/users.js";

import usersDao from "../database/users_dao.js"

// //set the tuits to a variable
// let users = people;

//find all of the users
// const findAllUsers = (req, res) => {
//     //responces with all of the users
//     res.json(users);
// }

const findAllUsers = async (req, res) => {
    //responces with all of the users
    const users = await usersDao.findAllUsers();
    res.json(users);
}


//creates a user
// const createUser = (req, res) => {
//     //makes a new user based on the request that it gets when it is called.
//     const newUser = req.body;

//     //gives the user a unique ID
//     newUser._id = (new Date()).getTime() + '';

//     //pushed the new user onto the stack
//     users.push(newUser);

//     //response with the new user
//     res.json(newUser);
// }

const createUser = async (req, res) => {
    // makes a new user based on the request that it gets when it is called.
    const newUser = req.body;

    //adds the new user to the database
    const insertedUser = await usersDao.createUser(newUser);

    //sends back the responce
    res.json(insertedUser)
}

//Updates a User
const updateUser = (req, res) => {

    //get the id of the user from the request
    const UserdIdToUpdate = req.params.tid;

    //makes an updated user
    const updatedUser = req.body;

    //maps over the users to update the list of users
    users = users.map(u => u._id === UserdIdToUpdate ? updatedUser : u);

    //sends back the user update
    res.sendStatus(200);
}


//Deletes a user
const deleteUser = (req, res) => {
    //gets the id of the user to delete
    const UserIdToDelete = req.params.tid;

    //filters the users based on the id given
    users = users.filter(u => u._id !== UserIdToDelete);

    //returns the delete user
    res.sendStatus(200);
}


//exports these functions so that the front end of the application can call these to interact with that data
export default (app) => {
    app.post('/api/users', createUser);
    app.get('/api/users', findAllUsers);
    app.put('/api/users/:uid', updateUser);
    app.delete('/api/users/:uid', deleteUser);
}
