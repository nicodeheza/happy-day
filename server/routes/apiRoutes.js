const express= require('express');
const router= express.Router();
const User= require('../models/User');
const  passport= require('passport');
const bcrypt= require('bcrypt');
const checkAuthenticated= require('../middlewares/auth');
const Event= require('../models/Event');
const Reminder = require('../models/Reminder');

const mongoose= require('mongoose');


router.get('/', checkAuthenticated, (req,res)=>{
    res.json({auth:true});
});

router.post('/singup',async (req,res)=>{
    
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
   
         const actualUser=await newUser.save();
   
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({message:"No User Exists"});
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.json({auth:true});
            console.log(req.user);
          });
        }
      })(req, res);
   
    } 
     }catch (error) {
        console.log(error);
    }

});

router.post('/login', passport.authenticate('local'), (req, res)=>{

    res.json({auth:true});

});

router.get('/logout', checkAuthenticated, (req,res)=>{
    req.logOut();
    res.json({auth:false});

    //la sesion no de borra de la base de datos (se modifica para marcar que estas logeado),
    // cuando haces login devuelta  no crea otra entrada en db sino que vuelve a modificar la existente para 
    //el usuario 
});

router.post('/add', checkAuthenticated, async (req,res)=>{
    try {

        const newEvent= new Event({
            type: req.body.event,
            AnniversaryType: req.body.type,
            personName: req.body.personName,
            date: req.body.date,
            user: req.user.id
        });

        const eventAdded= await newEvent.save();

        if(req.body.reminders.length > 0){
        let remindersArr=[];
        for(let i=0; i<req.body.reminders.length; i++){
            let obj= req.body.reminders[i];
            let newObj={
                name: obj.title,
                date: obj.date,
                event: eventAdded.id
            }
            remindersArr.push(newObj);   
        }
        
        
        const remindersAdded= await Reminder.create(remindersArr);

        eventAdded.reminders= remindersAdded;
        await eventAdded.save();
        }

        res.json({message:'Event Added'});
 
    } catch (error) {
        if(error)console.log(error);
        res.json({message:"Event Don't Added"});
    }
});

router.get('/events',checkAuthenticated, async (req,res)=>{

    try {
        const event= await Event.find({user: req.user.id}).populate('reminders').exec();
        let calendar={};
        
        event.forEach(ele=>{
            const month= ele.date.getMonth() + 1;
            const day= ele.date.getDate();
        
            if(!calendar[`${month}`]){
                calendar[`${month}`]={};
                calendar[`${month}`][`${day}`]= [ele];
            }else{

                if(calendar[`${month}`][`${day}`]){
                    
                    calendar[`${month}`][`${day}`].push(ele);
                }else{
                    calendar[`${month}`][`${day}`]= [ele];
                }
            }

        });
        res.json(calendar);

    } catch (error) {
        if(error) console.log(error);
    }
   
});

router.put('/edit', checkAuthenticated, async (req, res)=>{

    let editEvent={
        type: req.body.event,
        AnniversaryType: req.body.type,
        personName: req.body.personName,
        date: req.body.date,
        reminders: req.body.reminders,
        user: req.user.id
    }
   
    try {

        if(req.body.removeReminders.length > 0){
            await Reminder.deleteMany({_id: req.body.removeReminders});
        }
        
        let toSave= [];
        let remindersUpdated=[];
  
        for(let i=0; i<editEvent.reminders.length; i++){
            let ele= editEvent.reminders[i];
            if(!ele._id){
                const newReminder={
                    name:ele.name,
                    date:ele.date,
                    event:ele.event
                };       
                toSave.push(newReminder);

            }else{
                if(ele.name === 'The Same Day'){
                    ele.date= editEvent.date;
                  }else{
                    const dateSub= ele.name.split(' ',2);
                    let dateInMs= new Date(editEvent.date).getTime();
                    const oneDay=1000*60*60*24;
                    const oneWeek= oneDay * 7;
                    if(dateSub[1]==='Days'){
                      ele.date= new Date(dateInMs - oneDay * dateSub[0]);
                    }else{
                      ele.date= new Date(dateInMs - oneWeek * dateSub[0]);
                    }
                  }

                  await Reminder.findByIdAndUpdate(ele._id, {date: ele.date});
                  remindersUpdated.push(ele._id);
                }
            }

        

        if(toSave.length > 0){
            
            const remindersAdded= await Reminder.create(toSave);
            remindersAdded.forEach(ele=>{
                remindersUpdated.push(ele._id);
            });
        }

        editEvent= {...editEvent, reminders: remindersUpdated};

        await Event.findByIdAndUpdate(req.body._id, editEvent);

        res.json({message: 'Event Edited'});
        
    } catch (error) {
        if(error)console.log(error);
        res.json({error: "Event don't edited"})
    }



});

router.delete('/delete', checkAuthenticated, async (req, res)=>{

    try {
        if(req.body.remindersId.length > 0){
            await Reminder.deleteMany({ _id: req.body.remindersId});
        }

        await Event.findByIdAndRemove(req.body.eventId);

        res.json({message:"Event Deleted"});


    } catch (error) {
        if(error)console.log(error);
        res.json({message:"Event Don't Deleted"});
    }
    
});

router.get('/emailNotification', checkAuthenticated, async (req,res)=>{
    try {
        const user= await User.findById(req.user.id);
        res.json({mailNotification: user.mailNotification});
    } catch (error) {
        if(error)console.log(error);
        res.json({error: "can't get mailNotification"});
    }
});

router.put('/emailNotification', checkAuthenticated, async (req,res)=>{
    try {
        const user= await User.findById(req.user.id);
        user.mailNotification= ! user.mailNotification;
        const UpdateUser= await user.save()
        res.json({mailNotification: UpdateUser.mailNotification});
    } catch (error) {
        if(error)console.log(error);
        res.json({error: "can't update mailNotification"});
    }
});

router.post('/noti-sub', checkAuthenticated, async (req, res)=>{
    try {
        const user= await User.findById(req.user.id);
        user.browserNotification= req.body;
        await user.save();
        res.json({message: 'subscription added'});
    } catch (error) {
        if(error)console.log(error);
    }
});


module.exports= router;

