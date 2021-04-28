require('dotenv').config();
const express= require('express');
const app= express();
const cors= require('cors');
const session= require('express-session');
const cookieParser= require('cookie-parser');
const passport= require('passport');
const MongoStore= require('connect-mongo');

const apiRoutes= require('./routes/apiRoutes');

const mongoose= require('mongoose');
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
const db= mongoose.connection;
db.on('error', err=> console.error(err));
db.once('open', ()=>console.log("connected to Mongoose"));

app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
    })
  );
  //cuando cargue agregar mongostore al session 
app.use(cookieParser(process.env.SECRET)); //require ('crypto').randomBytes(64).toString('hex') en consola con node

require('./middlewares/passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRoutes);


const PORT= process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Server runing on port ${PORT}`));