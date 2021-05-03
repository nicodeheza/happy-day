const mongoose= require('mongoose');

const reminderSchema= new mongoose.Schema({
    name:{type: String, required:true},
    date:{type: Date, required:true},
    event:{type:mongoose.Schema.Types.ObjectId, ref:'Event' , required:true}

});

module.exports= mongoose.model('Reminder', reminderSchema);