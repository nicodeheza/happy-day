require('dotenv').config();
const express= require('express');
const app= express();
const cors= require('cors');
const session= require('express-session');
const cookieParser= require('cookie-parser');
const passport= require('passport');

const apiRoutes= require('./routes/apiRoutes');

app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(cookieParser(process.env.SECRET)); //require ('crypto').randomBytes(64).toString('hex') en consola con node
app.use(passport.initialize());
app.use(passport.session());
require('./middlewares/passportConfig')(passport);



const mongoose= require('mongoose');
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
const db= mongoose.connection;
db.on('error', err=> console.error(err));
db.once('open', ()=>console.log("connected to Mongoose"));



app.use('/api', apiRoutes);

const PORT= process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Server runing on port ${PORT}`));