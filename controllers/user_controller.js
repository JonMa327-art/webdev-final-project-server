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

const signUpUser = async (req, res) => {
    const user = req.body;

    //needs to check if the user has already been made
    const existingUser = await usersDao.findUserByEmail(user.email)

    //if the user was found, return an error
    if (existingUser.length >= 1) {
        res.sendStatus(403)
    }
    //else create the user
    else {
        createUser(req, res)
    }
}

const loginUser = async (req, res) => {
    const user = req.body;

    //needs to check if the user has already been made
    const existingUser = await usersDao.findUserBycredentials(user.username, user.password)
    console.log("logging in " + existingUser)
    if (existingUser) {
        req.session['currentUser'] = existingUser;

        return res.sendStatus(200);
    }
    //else the user does not exist
    else {
        return res.sendStatus(503)
    }
}


const profile = async (req, res) => {
    const currentUser = req.session['currentUser']
    console.log("profile " + JSON.stringify(currentUser))
    if (currentUser) {
        res.json(currentUser)
    }
    else {
        res.sendStatus(503)
    }
}

const logout = (req, res) => {
    return res.sendStatus(200);
    if (req.session['currentUser']) {
        req.session['currentUser'] = null;
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(503)
    }
}

//Updates a User
const updateUser = async (req, res) => {
    //makes an updated user
    const updatedUserInfo = req.body;

    //sends a request to the database to update the user. give them the id of the user and the user themeslves
    const status = await usersDao.updateUser(updatedUserInfo.email, updatedUserInfo);
    console.log(status)
    req.session['currentUser'] = status;

    //sends back the user update
    return res.sendStatus(200)
}


//Deletes a user
const deleteUser = async (req, res) => {
    //gets the id of the user to delete
    const userIdToDelete = req.params.uid;

    const status = await usersDao.deleteUser(userIdToDelete);
    //filters the users based on the id given

    //returns the delete user
    res.send(status);
}


//exports these functions so that the front end of the application can call these to interact with that data
export default (app) => {
    app.post('/api/signup', signUpUser);
    app.post('/api/login', loginUser);
    app.post('/api/logout', logout);
    app.post('/api/profile', profile);
    app.post('/api/users', createUser);
    app.post('/api/users/credentials', findUserBycredentials)
    app.get('/api/users', findAllUsers);
    app.put('/api/users/:uid', updateUser);
    app.delete('/api/users/:uid', deleteUser);
}
