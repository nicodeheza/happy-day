require('dotenv').config();
const express= require('express');
const router= express.Router();
const Recover= require('../models/Recover');
const transporter= require('../notifications/nodemailer-transporter');
const path= require('path');
const User= require('../models/User');
const bcrypt= require('bcrypt');

router.post('/', async(req,res)=>{
    try {
        const recover= new Recover({
            email: req.body.email
        });
        const newRecover= await recover.save();
        console.log(newRecover);
        if(newRecover._id){
            let email= await transporter.sendMail({
                from:'"Happy Day" <happy.day.noti@gmail.com>',
                to: newRecover.email,
                subject:'Recover your Password.',
                html:`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
                    <style>
                        body{
                            text-align: center;
                        }
                        img{
                            width: 100px;
                        }
                        h2{
                            font-family: 'Fredoka One', cursive;
                            color: #078acc;
                            font-weight: normal;
                        }
                    </style>
                </head>
                <body>
                <img src="https://i.ibb.co/QQYf02y/logo.png" alt="Happy Day">
                <h2>Enter this link to reset your password</h2> 
                <a href="http://localhost:4000/recover/${newRecover._id}">http://localhost:4000/recover/${newRecover._id}</a>
                </body>
                </html>
                `
            });
            if(process.env.NODE_ENV !== "test"){
            console.log("Message sent: %s", email.messageId); 
            }
            
            res.json({message:"Email sended"});
        }else{
            res.json({message:"Something get rong"});
        }
        
        
    } catch (err) {
        if(err)console.log(err);
        res.json({message:"Something get rong"});
    }
});
router.get('/:id', async(req,res)=>{
    try {
       const recover= await Recover.findById(req.params.id);
       if(recover){
       const toExpire= new Date(recover.expire).getTime() - new Date().getTime();

       if(toExpire > 0){
           res.sendFile(path.join(__dirname, '../recover-statics/recover-form.html'));
       }else{
            await Recover.findByIdAndDelete(req.params.id);
           res.send('Link expires, get a new one');
       }
    }else{
        res.send('Link expires, get a new one');
    }
    } catch (err) {
        console.log(err);
        res.send('Error, try agen');
    }
   
});
router.put('/:id', async(req,res)=>{
     try {
        const recover= await Recover.findById(req.params.id);
        const toExpire= new Date(recover.expire).getTime() - new Date().getTime();
 
        if(toExpire > 0){
            const email= recover.email;
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.findOneAndUpdate({email:email}, {password: hashedPassword } );
            await Recover.findByIdAndDelete(req.params.id);
            res.json({message: 'Password updated'});

        }else{
            await Recover.findByIdAndDelete(req.params.id);
            res.json({message:"Link expires, get a new one"});
        }
         
     } catch (err) {
         if(err)console.log(err);
         res.json({message:"Error, try agen"})
     }
});

module.exports= router;