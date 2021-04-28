const User= require('../models/User');
const bcrypt= require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports= function(passport){
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done)=>{
            User.findOne({email:email}, (err,user)=>{
                if(err)console.error(err);
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(err)console.error(err);
                    if(result === true){
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                } ); 
            });
        })
    );

    passport.serializeUser((user, cb)=>{

        cb(null, user.id);
    });

    passport.deserializeUser((id, cb)=>{
        User.findById(id, (err,user)=>{
            cb(err, user);
        });
    });
}