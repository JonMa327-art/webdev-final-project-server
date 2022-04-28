//loads a libaray into the local space
// Can do it this way since we added  "type": "module" to package.json
import express from 'express';

// const session = require('express-session');
import session from 'express-session';

//allows resources to be shared acrcoss domains
import cors from 'cors';

//imports mongoose for it to be used
import mongoose from 'mongoose';

//imports the controllers
import userController from './controllers/user_controller.js';

//connects to the webdevFP database
mongoose.connect('mongodb://localhost:27017/webdevFP');

//express() creates an instance of the express library and assigns it to app
const app = express();


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
// app.use(cors());
app.use(express.json());


const sess = {
    secret: 'keyboard cat',
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

//give the user controller the app conponent
userController(app)
app.listen(4000);