const User= require('../models/User');
const bcrypt= require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports= function(passport){
    passport.use(
        new localStrategy( async (email, password, done)=>{
            try {
                const user= await User.findOne({email:email});
                if(!user){
                    return done(null, false)
                }else{
                    const isUser= await bcrypt.compare(password, user.password);
                    if(isUser){
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                }

            } catch (error) {
                throw error;
            }
        })
    );

    passport.serializeUser((user, done)=>{
        done(null, user._id);
    });

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err,user)=>{
            done(err, user);
        });
    });
}