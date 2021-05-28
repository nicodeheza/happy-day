require('dotenv').config();
const express= require('express');
const app= express();
const path= require('path');
const cors= require('cors');
const session= require('express-session');
const cookieParser= require('cookie-parser');
const passport= require('passport');
const MongoStore= require('connect-mongo');

const apiRoutes= require('./routes/apiRoutes');
const recoverRoutes= require('./routes/recoverRoutes');

const mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);
const mongo_uri= process.env.NODE_ENV === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true});
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
      store: MongoStore.create({ mongoUrl: mongo_uri })
    })
  );
  //cuando cargue agregar mongostore al session 
app.use(cookieParser(process.env.SECRET)); //require ('crypto').randomBytes(64).toString('hex') en consola con node

require('./middlewares/passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRoutes);
app.use('/recover', recoverRoutes);

//serv react app -no olvidar atualizar si hay cambios 
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '/reactBuild')));
  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/reactBuild/index.html'));
  });
}


const PORT= process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Server runing on port ${PORT}`));

if(process.env.NODE_ENV === "test"){
  module.exports= app;
}

//send notifications  

 const sendNoti= require('./notifications/sendNotifiactions');
 const schedule = require('node-schedule'); 

 schedule.scheduleJob('00 10 * * *', ()=> sendNoti());
 //sendNoti();

 console.log(process.env.NODE_ENV);

 