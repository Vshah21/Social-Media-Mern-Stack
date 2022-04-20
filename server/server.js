const config = require('./config/config');
require('dotenv').config()


const express= require('express'),
      userRoutes = require('./routes/user.routes'),
      authRoutes = require('./routes/auth.routes'),
      postRoutes = require('./routes/post.routes')

const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


const uri = process.env.MONGODB_URI
mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB database connection estabilished")
})


app.use(cors());
app.use(express.json());
app.use(express.static('../public/public')); //Serves resources from public folder

app.use( '/', userRoutes)
app.use('/',authRoutes)
app.use('/',postRoutes)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message})
    }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message})
        console.log(err)
    }
})

app.listen(5000,()=>{
    console.log(`You are currently listening on port 5000`);
})