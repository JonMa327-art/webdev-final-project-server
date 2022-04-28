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

import reviewController from "./controllers/review_controller.js";

//connects to the webdevFP database
mongoose.connect('mongodb://localhost:27017/webdevFP');

//express() creates an instance of the express library and assigns it to app
const app = express();
app.use(cors());
app.use(express.json());



app.get('/hello', (req, res) => { res.send('Hello World!') })
userController(app)
reviewController(app)
app.listen(4000);
