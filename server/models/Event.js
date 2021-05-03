const mongoose= require('mongoose');

const eventSchema= new mongoose.Schema({
    type: {type: String, required:true},
    AnniversaryType: String,
    personName:{type: String, required:true},
    date: {type: Date, required: true},
    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref:'Reminder'}],
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User'}

});

module.exports= mongoose.model('Event', eventSchema);