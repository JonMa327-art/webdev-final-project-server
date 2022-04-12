//import the data action object which connect to the server
//enables use to retrieve data from the server to talk to it and modifty it as well
import usersDao from "../database/users/users_dao.js"

//finds all of the users
const findAllUsers = async (req, res) => {
    //responces with all of the users
    const users = await usersDao.findAllUsers();
    res.json(users);
}

//finds a specific user
const findUserBycredentials = async (req, res) => {
    //responces with all of the users
    const credentials = req.body;

    //is the username of the credentails
    const username = credentials.username;

    //is the password of the credentails
    const password = credentials.password;

    const users = await usersDao.findUserBycredentials(username, password);

    if (users) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(403);
    }
}

//creates a user
const createUser = async (req, res) => {
    // makes a new user based on the request that it gets when it is called.
    const newUser = req.body;

    //adds the new user to the database
    const insertedUser = await usersDao.createUser(newUser);

    //sends back the responce
    res.json(insertedUser)
}

//Updates a User
const updateUser = async (req, res) => {

    //get the id of the user from the request
    const UserdIdToUpdate = req.params.tid;

    //makes an updated user
    const updatedUser = req.body;

    //sends a request to the database to update the user. give them the id of the user and the user themeslves
    const status = await usersDao.updateUser(UserdIdToUpdate, updatedUser);

    //sends back the user update
    res.send(status);
}


//Deletes a user
const deleteUser = async (req, res) => {
    //gets the id of the user to delete
    const userIdToDelete = req.params.tid;

    const status = await usersDao.deleteUser(userIdToDelete);
    //filters the users based on the id given

    //returns the delete user
    res.send(status);
}


//exports these functions so that the front end of the application can call these to interact with that data
export default (app) => {
    app.post('/api/users', createUser);
    app.post('/api/users/credentials', findUserBycredentials)
    app.get('/api/users', findAllUsers);
    app.put('/api/users/:uid', updateUser);
    app.delete('/api/users/:uid', deleteUser);
}
