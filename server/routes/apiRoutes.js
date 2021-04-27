const express= require('express');
const router= express.Router();
const User= require('../models/User');
// const  passport= require('passport');
// const bcrypt= require('bcrypt');

router.get('/', (req,res)=>{
    res.send('ok');
});

router.post('/singup',async (req,res)=>{
    console.log(req.body);
   try {
       const user= await User.findOne({email: req.body.email});
       if(user){
           res.json({message:'There is already an account  with this email'});
       }else{

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser= new User({
            email: req.body.email,
            name: req.body.name,
            birthday: req.body.birthday,
            password: hashedPassword
        });

        await newUser.save();

        // passport.authenticate('local',(err,user,info)=>{
        //     if(err)throw err;
        //     if(user){
        //         req.logIn(user,(err)=>{
        //             if(err)throw err;
        //             res.json({auth: true});
        //         });
        //     }
        // });

        res.json({message:'user created'});

       }

   } catch (error) {
       console.log(error);
   }

});

module.exports= router;