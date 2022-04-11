//loads a libaray into the local space
// Can do it this way since we added  "type": "module" to package.json
import express from 'express';

//allows resources to be shared acrcoss domains
import cors from 'cors';

//imports mongoose for it to be used
import mongoose from 'mongoose';

//imports the controllers
import userController from './controllers/user_controller.js';
import { response } from 'express';

//connects to the webdevFP database
mongoose.connect('mongodb://localhost:27017/webdevFP');

// const usersSchema = mongoose.Schema({
//     username: String,
//     password: String,
//     email: String,
//     role: String
// }, { collection: "users" });


// const userModel = mongoose.model('userModel', usersSchema);

// const findAllUsers = async () => {
//     const users = await userModel.find()
//     console.log(users)
// }

// findAllUsers()

//express() creates an instance of the express library and assigns it to app
const app = express();
app.use(cors());
app.use(express.json());



app.get('/hello', (req, res) => { res.send('Hello World!') })
//give the user controller the app conponent
userController(app)
app.listen(4000);